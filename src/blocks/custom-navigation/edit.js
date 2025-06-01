// external dependencies
import clsx from "clsx";

// wordpress dependencies
import {
  useBlockProps,
  withColors,
  InspectorControls,
  RecursionProvider,
  useHasRecursion,
  store as blockEditorStore,
  ContrastChecker,
  getColorClassName,
  Warning,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
  useBlockEditingMode,
} from "@wordpress/block-editor";
import {
  useCallback,
  useState,
  useEffect,
  useRef,
  Platform,
} from "@wordpress/element";
import { EntityProvider, store as coreStore } from "@wordpress/core-data";
import { useDispatch, useSelect } from "@wordpress/data";
import {
  PanelBody,
  ToggleControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  Button,
  Spinner,
  Notice,
  Placeholder,
  __experimentalHStack as HStack,
  __experimentalHeading as Heading,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { speak } from "@wordpress/a11y";
import { close, Icon } from "@wordpress/icons";
import { useInstanceId } from "@wordpress/compose";

// internal dependencies
import { unlock } from "../lock-unlock";
import useNavigationNotice from "./edit/use-navigation-notice";
import useCreateNavigationMenu from "./edit/use-create-navigation-menu";
import useInnerBlocks from "./edit/use-inner-blocks";
import useNavigationMenu from "./edit/use-navigation-menu";
import useNavigationEntities from "./edit/use-navigation-entities";
import useConvertClassicToBlockMenu, {
  CLASSIC_MENU_CONVERSION_ERROR,
  CLASSIC_MENU_CONVERSION_PENDING,
  CLASSIC_MENU_CONVERSION_SUCCESS,
} from "./edit/use-convert-menu-classic-to-block";
import OverlayMenuIcon from "./edit/overlay-menu-icon";
import OverlayMenuPreview from "./edit/overlay-menu-preview";
import AccessibleDescription from "./edit/accessible-description";
import MenuInspectorControls from "./edit/menu-inspector-controls";
import ResponsiveWrapper from "./edit/responsive-wrapper";
import DeletedNavigationWarning from "./edit/delete-navigation-warning";
import UnsavedInnerBlocks from "./edit/unsaved-inner-blocks";
import NavigationInnerBlocks from "./edit/inner-blocks";
import NavigationMenuNameControl from "./edit/navigation-menu-name-control";
import NavigationMenuDeleteControl from "./edit/navigation-menu-delete-control";
import ManageMenusButton from "./edit/managa-menu-buttons";
import AccessibleMenuDescription from "./edit/accessible-menu-description";
import { detectColors } from "./edit/utils";
import NavigationPlaceholder from "./edit/placeholder";
import "./editor.css";

function ColorTools({
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
  overlayTextColor,
  setOverlayTextColor,
  overlayBackgroundColor,
  setOverlayBackgroundColor,
  clientId,
  navRef,
}) {
  const [detectedBackgroundColor, setDetectedBackgroundColor] = useState();
  const [detectedColor, setDetectedColor] = useState();
  const [detectedOverlayBackgroundColor, setDetectedOverlayBackgroundColor] =
    useState();
  const [detectedOverlayColor, setDetectedOverlayColor] = useState();
  // Turn on contrast checker for web only since it's not supported on mobile yet.
  const enableContrastChecking = Platform.OS === "web";
  useEffect(() => {
    if (!enableContrastChecking) {
      return;
    }
    detectColors(navRef.current, setDetectedColor, setDetectedBackgroundColor);

    const subMenuElement = navRef.current?.querySelector(
      '[data-type="core/navigation-submenu"] [data-type="core/navigation-link"]'
    );

    if (!subMenuElement) {
      return;
    }

    // only detect submenu overlay colors if they have previously been
    // explicitly set
    if (overlayTextColor.color || overlayBackgroundColor.color) {
      detectColors(
        subMenuElement,
        setDetectedOverlayColor,
        setDetectedOverlayBackgroundColor
      );
    }
  }, [
    enableContrastChecking,
    overlayTextColor.color,
    overlayBackgroundColor.color,
    navRef,
  ]);
  const colorGradientSettings = useMultipleOriginColorsAndGradients();
  if (!colorGradientSettings.hasColorsOrGradients) {
    return null;
  }
  return (
    <>
      <ColorGradientSettingsDropdown
        __experimentalIsRenderedInSidebar
        settings={[
          {
            colorValue: textColor.color,
            label: __("Text"),
            onColorChange: setTextColor,
            resetAllFilter: () => setTextColor(),
            clearable: true,
            enableAlpha: true,
          },
          {
            colorValue: backgroundColor.color,
            label: __("Background"),
            onColorChange: setBackgroundColor,
            resetAllFilter: () => setBackgroundColor(),
            clearable: true,
            enableAlpha: true,
          },
          {
            colorValue: overlayTextColor.color,
            label: __("Submenu & overlay text"),
            onColorChange: setOverlayTextColor,
            resetAllFilter: () => setOverlayTextColor(),
            clearable: true,
            enableAlpha: true,
          },
          {
            colorValue: overlayBackgroundColor.color,
            label: __("Submenu & overlay background"),
            onColorChange: setOverlayBackgroundColor,
            resetAllFilter: () => setOverlayBackgroundColor(),
            clearable: true,
            enableAlpha: true,
          },
        ]}
        panelId={clientId}
        {...colorGradientSettings}
        gradients={[]}
        disableCustomGradients
      />
      {enableContrastChecking && (
        <>
          <ContrastChecker
            backgroundColor={detectedBackgroundColor}
            textColor={detectedColor}
          />
          <ContrastChecker
            backgroundColor={detectedOverlayBackgroundColor}
            textColor={detectedOverlayColor}
          />
        </>
      )}
    </>
  );
}

function edit_navigation({
  attributes,
  setAttributes,
  clientId,
  isSelected,
  className,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  overlayBackgroundColor,
  setOverlayBackgroundColor,
  overlayTextColor,
  setOverlayTextColor,
  hasSubmenuIndicatorSetting = true,
  customPlaceholder: CustomPlaceholder = null,
  __unstableLayoutClassNames: layoutClassNames,
}) {
  // get data from attributes
  const {
    openSubmenusOnClick,
    overlayMenu,
    showSubmenuIcon,
    templateLock,
    layout: {
      justifyContent,
      orientation = "horizontal",
      flexWrap = "wrap",
    } = {},
    hasIcon,
    icon = "handle",
  } = attributes;

  // get menu reference and define reference-setter
  const ref = attributes.ref;
  const setRef = useCallback(
    (postId) => {
      setAttributes({ ref: postId });
    },
    [setAttributes]
  );
  const navRef = useRef();

  // recursion setup
  const recursionId = `navigationMenu/${ref}`;
  const hasAlreadyRendered = useHasRecursion(recursionId);

  // block editing
  const blockEditingMode = useBlockEditingMode();

  // html tag for the wrapper
  const TagName = "nav";

  // block properties
  const hasBlockOverlay = useSelect(
    (select) =>
      select(blockEditorStore).__unstableHasActiveBlockOverlayActive(clientId),
    [clientId]
  );
  const textDecoration = attributes.style?.typography?.textDecoration;
  const isResponsive = "never" !== overlayMenu;
  const blockProps = useBlockProps({
    ref: navRef,
    className: clsx(
      className,
      {
        "items-justified-right": justifyContent === "right",
        "items-justified-space-between": justifyContent === "space-between",
        "items-justified-left": justifyContent === "left",
        "items-justified-center": justifyContent === "center",
        "is-vertical": orientation === "vertical",
        "no-wrap": flexWrap === "nowrap",
        "is-responsive": isResponsive,
        "has-text-color": !!textColor.color || !!textColor?.class,
        [getColorClassName("color", textColor?.slug)]: !!textColor?.slug,
        "has-background": !!backgroundColor.color || backgroundColor.class,
        [getColorClassName("background-color", backgroundColor?.slug)]:
          !!backgroundColor?.slug,
        [`has-text-decoration-${textDecoration}`]: textDecoration,
        "block-editor-block-content-overlay": hasBlockOverlay,
      },
      layoutClassNames
    ),
    style: {
      color: !textColor?.slug && textColor?.color,
      backgroundColor: !backgroundColor?.slug && backgroundColor?.color,
    },
  });

  // get callback and state constants for creating a new menu
  const {
    create: createNavigationMenu,
    status: createNavigationMenuStatus,
    error: createNavigationMenuError,
    value: createNavigationMenuPost,
    isPending: isCreatingNavigationMenu,
    isSuccess: createNavigationMenuIsSuccess,
    isError: createNavigationMenuIsError,
  } = useCreateNavigationMenu(clientId);

  // get checks etc. for selecting/using a given menu
  const {
    hasResolvedNavigationMenus,
    isNavigationMenuResolved,
    isNavigationMenuMissing,
    canUserUpdateNavigationMenu,
    hasResolvedCanUserUpdateNavigationMenu,
    canUserDeleteNavigationMenu,
    hasResolvedCanUserDeleteNavigationMenu,
    canUserCreateNavigationMenus,
    isResolvingCanUserCreateNavigationMenus,
    hasResolvedCanUserCreateNavigationMenus,
  } = useNavigationMenu(ref);

  // define user permissions for managing menus
  const hasManagePermissions =
    canUserCreateNavigationMenus || canUserUpdateNavigationMenu;
  const isManageMenusButtonDisabled =
    !hasManagePermissions || !hasResolvedNavigationMenus;

  // define if menu is resolved, but still missing
  const navMenuResolvedButMissing =
    hasResolvedNavigationMenus && isNavigationMenuMissing;

  // define constant for checking if a navigation entity is available
  const isEntityAvailable =
    !isNavigationMenuMissing && isNavigationMenuResolved;

  // inner blocks
  //  get checks/constants for handling inner blocks
  const {
    hasUncontrolledInnerBlocks,
    uncontrolledInnerBlocks,
    isInnerBlockSelected,
    innerBlocks,
  } = useInnerBlocks(clientId);
  //  get functions for handling inner blocks
  const {
    replaceInnerBlocks,
    selectBlock,
    __unstableMarkNextChangeAsNotPersistent,
  } = useDispatch(blockEditorStore);
  //  check if unsaved inner blocks are present
  const hasUnsavedBlocks = hasUncontrolledInnerBlocks && !isEntityAvailable;

  // submenus
  //  check if menus present
  const hasSubmenus = !!innerBlocks.find(
    (block) => block.name === "core/navigation-submenu"
  );
  //  define accessibility notice
  const submenuAccessibilityNotice =
    !showSubmenuIcon && !openSubmenusOnClick
      ? __(
          'The current menu options offer reduced accessibility for users and are not recommended. Enabling either "Open on Click" or "Show arrow" offers enhanced accessibility by allowing keyboard users to browse submenus selectively.',
          "foodblog16-plus"
        )
      : "";
  //  turn of accessibility notice on first render
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isFirstRender.current && submenuAccessibilityNotice) {
      speak(submenuAccessibilityNotice);
    }
    isFirstRender.current = false;
  }, [submenuAccessibilityNotice]);

  // overlay menu
  const [overlayMenuPreview, setOverlayMenuPreview] = useState(false);
  const overlayMenuPreviewClasses = clsx(
    "wp-block-foodblog16-plus-custom-navigation__overlay-menu-preview",
    { open: overlayMenuPreview }
  );
  const overlayMenuPreviewId = useInstanceId(
    OverlayMenuPreview,
    `overlay-menu-preview`
  );

  // "loading" state:
  // - there is a menu creation process in progress
  // OR:
  // - there is a ref attribute pointing to a Navigation Post
  // - the Navigation Post isn't available (hasn't resolved) yet
  const isLoading =
    !hasResolvedNavigationMenus ||
    isCreatingNavigationMenu ||
    !!(ref && !isEntityAvailable);

  // "placeholder" state:
  // - there is no ref attribute pointing to a Navigation Post
  // - there is no menu creation process in progress
  // - there are no uncontrolled blocks
  const isPlaceholder =
    !ref &&
    !isCreatingNavigationMenu &&
    hasResolvedNavigationMenus &&
    !hasUncontrolledInnerBlocks;

  // define placeholder component
  const PlaceholderComponent = CustomPlaceholder
    ? CustomPlaceholder
    : Placeholder;

  // define if menu should be hidden by default
  const isHiddenByDefault = "always" === overlayMenu;

  // define ID for accessible description
  const accessibleDescriptionId = `${clientId}-desc`;

  // handle responsive menu opening/closing
  const [isResponsiveMenuOpen, setResponsiveMenuVisibility] = useState(false);

  // handle creating new empty navigation menu
  const createUntitledEmptyNavigationMenu = async () => {
    await createNavigationMenu("");
  };

  // callback for updating the current menu to a new menu
  const handleUpdateMenu = useCallback(
    (menuId, options = { focusNavigationBlock: false }) => {
      const { focusNavigationBlock } = options;
      setRef(menuId);
      if (focusNavigationBlock) {
        selectBlock(clientId);
      }
    },
    [selectBlock, clientId, setRef]
  );

  // handle selecting a menu in menu-selector
  const onSelectNavigationMenu = (menuId) => {
    handleUpdateMenu(menuId);
  };

  // create notices for menu status/permission
  //  status notice
  const [showNavigationMenuStatusNotice, hideNavigationMenuStatusNotice] =
    useNavigationNotice({
      name: "block-library/core/navigation/status",
    });
  //  permission notice
  const [
    showNavigationMenuPermissionsNotice,
    hideNavigationMenuPermissionsNotice,
  ] = useNavigationNotice({
    name: "block-library/core/navigation/permissions/update",
  });
  //  show notices
  useEffect(() => {
    hideNavigationMenuStatusNotice();

    if (isCreatingNavigationMenu) {
      speak(__("Creating Navigation Menu.", "foodblog16-plus"));
    }

    if (createNavigationMenuIsSuccess) {
      handleUpdateMenu(createNavigationMenuPost?.id, {
        focusNavigationBlock: true,
      });

      showNavigationMenuStatusNotice(
        __("Navigation Menu successfully created.", "foodblog16-plus")
      );
    }

    if (createNavigationMenuIsError) {
      showNavigationMenuStatusNotice(
        __("Failed to create Navigation Menu.", "foodblog16-plus")
      );
    }
  }, [
    createNavigationMenuStatus,
    createNavigationMenuError,
    createNavigationMenuPost?.id,
    createNavigationMenuIsError,
    createNavigationMenuIsSuccess,
    isCreatingNavigationMenu,
    handleUpdateMenu,
    hideNavigationMenuStatusNotice,
    showNavigationMenuStatusNotice,
  ]);
  useEffect(() => {
    if (!isSelected && !isInnerBlockSelected) {
      hideNavigationMenuPermissionsNotice();
    }

    if (isSelected || isInnerBlockSelected) {
      if (
        ref &&
        !navMenuResolvedButMissing &&
        hasResolvedCanUserUpdateNavigationMenu &&
        !canUserUpdateNavigationMenu
      ) {
        showNavigationMenuPermissionsNotice(
          __(
            "You do not have permission to edit this Menu. Any changes made will not be saved.",
            "foodblog16-plus"
          )
        );
      }

      if (
        !ref &&
        hasResolvedCanUserCreateNavigationMenus &&
        !canUserCreateNavigationMenus
      ) {
        showNavigationMenuPermissionsNotice(
          __(
            "You do not have permission to create Navigation Menus.",
            "foodblog16-plus"
          )
        );
      }
    }
  }, [
    isSelected,
    isInnerBlockSelected,
    canUserUpdateNavigationMenu,
    hasResolvedCanUserUpdateNavigationMenu,
    canUserCreateNavigationMenus,
    hasResolvedCanUserCreateNavigationMenus,
    ref,
    hideNavigationMenuPermissionsNotice,
    showNavigationMenuPermissionsNotice,
    navMenuResolvedButMissing,
  ]);

  // handle fallback
  //  request fallback-ID
  const { getNavigationFallbackId } = unlock(useSelect(coreStore));
  const navigationFallbackId = !(ref || hasUnsavedBlocks)
    ? getNavigationFallbackId()
    : null;
  //  set ref to fallback if neccessary
  useEffect(() => {
    if (ref || hasUnsavedBlocks || !navigationFallbackId) {
      return;
    }
    __unstableMarkNextChangeAsNotPersistent();
    setRef(navigationFallbackId);
  }, [
    ref,
    setRef,
    hasUnsavedBlocks,
    navigationFallbackId,
    __unstableMarkNextChangeAsNotPersistent,
  ]);

  // styling menu markup
  const stylingInspectorControls = (
    <>
      <InspectorControls>
        {hasSubmenuIndicatorSetting && (
          <PanelBody title={__("Display", "foodblog16-plus")}>
            {isResponsive && (
              <>
                <Button
                  className={overlayMenuPreviewClasses}
                  onClick={() => {
                    setOverlayMenuPreview(!overlayMenuPreview);
                  }}
                  aria-label={__("Overlay menu controls", "foodblog16-plus")}
                  aria-controls={overlayMenuPreviewId}
                  aria-expanded={overlayMenuPreview}
                >
                  {hasIcon && (
                    <>
                      <OverlayMenuIcon icon={icon} />
                      <Icon icon={close} />
                    </>
                  )}
                  {!hasIcon && (
                    <>
                      <span>{__("Menu", "foodblog16-plus")}</span>
                      <span>{__("Close", "foodblog16-plus")}</span>
                    </>
                  )}
                </Button>
                <div id={overlayMenuPreviewId}>
                  {overlayMenuPreview && (
                    <OverlayMenuPreview
                      setAttributes={setAttributes}
                      hasIcon={hasIcon}
                      icon={icon}
                      hidden={!overlayMenuPreview}
                    />
                  )}
                </div>
              </>
            )}
            <ToggleGroupControl
              __next40pxDefaultSize
              __nextHasNoMarginBottom
              labe={__("Overlay Menu", "foodblog16-plus")}
              value={overlayMenu}
              help={__(
                "Collapses the navigation options in a menu icon opening an overlay.",
                "foodblog16-plus"
              )}
              onChange={(value) => setAttributes({ overlayMenu: value })}
              isBlock
            >
              <ToggleGroupControlOption
                value="never"
                label={__("Off", "foodblog16-plus")}
              />
              <ToggleGroupControlOption
                value="mobile"
                label={__("Mobile", "foodblog16-plus")}
              />
              <ToggleGroupControlOption
                value="always"
                label={__("Always", "foodblog16-plus")}
              />
            </ToggleGroupControl>
            {hasSubmenus && (
              <>
                <h3>{__("Submenus", "foodblog16-plus")}</h3>
                <ToggleControl
                  __nextHasNoMarginBottom
                  checked={openSubmenusOnClick}
                  onChange={(value) => {
                    setAttributes({
                      openSubmenusOnClick: value,
                      ...(value && { showSubmenuIcon: true }),
                    });
                  }}
                  label={__("Open on click", "foodblog16-plus")}
                />
                <ToggleControl
                  __nextHasNoMarginBottom
                  checked={showSubmenuIcon}
                  onChange={(value) => {
                    setAttributes({
                      showSubmenuIcon: value,
                    });
                  }}
                  disabled={attributes.openSubmenusOnClick}
                  label={__("Show arrow", "foodblog16-plus")}
                />
                {submenuAccessibilityNotice && (
                  <div>
                    <Notice
                      spokenMessage={null}
                      status="warning"
                      isDismissible={false}
                    >
                      {submenuAccessibilityNotice}
                    </Notice>
                  </div>
                )}
              </>
            )}
          </PanelBody>
        )}
      </InspectorControls>
    </>
  );

  // render usaved navigation menu
  if (hasUnsavedBlocks && !isCreatingNavigationMenu) {
    return (
      <TagName
        {...blockProps}
        aria-describedby={!isPlaceholder ? accessibleDescriptionId : undefined}
      >
        <AccessibleDescription id={accessibleDescriptionId}>
          {__("Unsaved Navigation Menu.", "foodblog16-plus")}
        </AccessibleDescription>
        <MenuInspectorControls
          clientId={clientId}
          createNavigationMenuIsSuccess={createNavigationMenuIsSuccess}
          createNavigationMenuIsError={createNavigationMenuIsError}
          currentMenuId={ref}
          isNavigationMenuMissing={isNavigationMenuMissing}
          isManageMenusButtonDisabled={isManageMenusButtonDisabled}
          onCreateNew={createUntitledEmptyNavigationMenu}
          onSelectClassicMenu={null}
          onSelectNavigationMenu={onSelectNavigationMenu}
          isLoading={isLoading}
          blockEditingMode={blockEditingMode}
        />
        {blockEditingMode === "default" && stylingInspectorControls}
        <ResponsiveWrapper
          id={clientId}
          onToggle={setResponsiveMenuVisibility}
          isOpen={isResponsiveMenuOpen}
          hasIcon={hasIcon}
          icon={icon}
          isResponsive={isResponsive}
          isHiddenByDefault={isHiddenByDefault}
          overlayBackgroundColor={overlayBackgroundColor}
          overlayTextColor={overlayTextColor}
        >
          <UnsavedInnerBlocks
            createNavigationMenu={createNavigationMenu}
            blocks={uncontrolledInnerBlocks}
            hasSelection={isSelected || isInnerBlockSelected}
          />
        </ResponsiveWrapper>
      </TagName>
    );
  }

  // render warning if selected menu is no longer available
  if (ref && isNavigationMenuMissing) {
    return (
      <TagName {...blockProps}>
        <MenuInspectorControls
          clientId={clientId}
          createNavigationMenuIsSuccess={createNavigationMenuIsSuccess}
          createNavigationMenuIsError={createNavigationMenuIsError}
          currentMenuId={ref}
          isNavigationMenuMissing={isNavigationMenuMissing}
          isManageMenusButtonDisabled={isManageMenusButtonDisabled}
          onCreateNew={createUntitledEmptyNavigationMenu}
          onSelectClassicMenu={null}
          onSelectNavigationMenu={onSelectNavigationMenu}
          isLoading={isLoading}
          blockEditingMode={blockEditingMode}
        />
        <DeletedNavigationWarning
          onCreateNew={createUntitledEmptyNavigationMenu}
        />
      </TagName>
    );
  }

  // render warning if block has already rendered
  if (isEntityAvailable && hasAlreadyRendered) {
    return (
      <div {...blockProps}>
        <Warning>
          {__("Block cannot be rendered inside itself.", "foodblog16-plus")}
        </Warning>
      </div>
    );
  }

  // render placeholder
  if (isPlaceholder && CustomPlaceholder) {
    return (
      <TagName {...blockProps}>
        <PlaceholderComponent
          isSelected={isSelected}
          currentMenuId={ref}
          clientId={clientId}
          canUserCreateNavigationMenus={canUserCreateNavigationMenus}
          isResolvingCanUserCreateNavigationMenus={
            isResolvingCanUserCreateNavigationMenus
          }
          onSelectNavigationMenu={onSelectNavigationMenu}
          onSelectClassicMenu={null}
          onCreateEmpty={createUntitledEmptyNavigationMenu}
        />
      </TagName>
    );
  }

  // render block
  return (
    <EntityProvider kind="postType" type="wp_navigation" id={ref}>
      <RecursionProvider uniqueId={recursionId}>
        <MenuInspectorControls
          clientId={clientId}
          createNavigationMenuIsSuccess={createNavigationMenuIsSuccess}
          createNavigationMenuIsError={createNavigationMenuIsError}
          currentMenuId={ref}
          isNavigationMenuMissing={isNavigationMenuMissing}
          isManageMenusButtonDisabled={isManageMenusButtonDisabled}
          onCreateNew={createUntitledEmptyNavigationMenu}
          onSelectNavigationMenu={onSelectNavigationMenu}
          onSelectClassicMenu={null}
          isLoading={isLoading}
          blockEditingMode={blockEditingMode}
        />
        {blockEditingMode === "default" && stylingInspectorControls}
        <TagName
          {...blockProps}
          aria-describedby={
            !isPlaceholder && !isLoading ? accessibleDescriptionId : undefined
          }
        >
          {isLoading && !isHiddenByDefault && (
            <div className="wp-block-foodblog16-plus-custom-navigation__loading-indicator-container">
              <Spinner className="wp-block-foodblog16-plus-custom-navigation__loading-indicator" />
            </div>
          )}
          {(!isLoading || isHiddenByDefault) && (
            <>
              <AccessibleMenuDescription id={accessibleDescriptionId} />
              <ResponsiveWrapper
                id={clientId}
                onToggle={setResponsiveMenuVisibility}
                hasIcon={hasIcon}
                icon={icon}
                isOpen={isResponsiveMenuOpen}
                isResponsive={isResponsive}
                isHiddenByDefault={isHiddenByDefault}
                overlayBackgroundColor={overlayBackgroundColor}
                overlayTextColor={overlayTextColor}
              >
                {isEntityAvailable && (
                  <NavigationInnerBlocks
                    clientId={clientId}
                    hasCustomPlaceholder={!!CustomPlaceholder}
                    templateLock={templateLock}
                    orientation={orientation}
                  />
                )}
              </ResponsiveWrapper>
            </>
          )}
        </TagName>
      </RecursionProvider>
    </EntityProvider>
  );
}

export default withColors(
  { textColor: "color" },
  { backgroundColor: "color" },
  { overlayBackgroundColor: "color" },
  { overlayTextColor: "color" }
)(edit_navigation);
