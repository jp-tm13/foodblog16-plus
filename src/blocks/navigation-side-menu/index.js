// wordpress dependencies
import { registerBlockType } from "@wordpress/blocks";
import {
  store as blockEditorStore,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
  useBlockEditingMode,
} from "@wordpress/block-editor";
import { useCallback, useEffect } from "@wordpress/element";
import { store as coreStore } from "@wordpress/core-data";
import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

// internal dependencies
import useNavigationMenu from "./edit/use-navigation-menu";
import MenuInspectorControls from "./edit/menu-inspector-controls";
import { unlock } from "../lock-unlock";
import block from "./block.json";
import sideMenu from "../../icons/side-menu";
import "./main.css";

registerBlockType(block.name, {
  icon: sideMenu.primary,
  edit({ attributes, setAttributes, clientId }) {
    // get menu reference and define reference-setter
    const ref = attributes.ref;
    const setRef = useCallback(
      (postId) => {
        setAttributes({ ref: postId });
      },
      [setAttributes]
    );

    // block editing
    const blockEditingMode = useBlockEditingMode();

    // get checks etc. for selecting/using a given menu
    const {
      hasResolvedNavigationMenus,
      isNavigationMenuResolved,
      isNavigationMenuMissing,
      canUserUpdateNavigationMenu,
      canUserCreateNavigationMenus,
    } = useNavigationMenu(ref);

    // define constant for checking if a navigation entity is available
    const isEntityAvailable =
      !isNavigationMenuMissing && isNavigationMenuResolved;

    // define user permissions for managing menus
    const hasManagePermissions =
      canUserCreateNavigationMenus || canUserUpdateNavigationMenu;
    const isManageMenusButtonDisabled =
      !hasManagePermissions || !hasResolvedNavigationMenus;

    // "loading" state:
    // - there is a menu creation process in progress
    // OR:
    // - there is a ref attribute pointing to a Navigation Post
    // - the Navigation Post isn't available (hasn't resolved) yet
    const isLoading =
      !hasResolvedNavigationMenus || !!(ref && !isEntityAvailable);

    // callback for updating the current menu to a new menu
    const handleUpdateMenu = useCallback(
      (menuId) => {
        setRef(menuId);
      },
      [setRef]
    );

    // handle selecting a menu in menu-selector
    const onSelectNavigationMenu = (menuId) => {
      handleUpdateMenu(menuId);
    };

    // handle fallback
    //  request fallback-ID
    const { getNavigationFallbackId } = unlock(useSelect(coreStore));
    const navigationFallbackId = !ref ? getNavigationFallbackId() : null;
    //  set ref to fallback if neccessary
    const { __unstableMarkNextChangeAsNotPersistent } =
      useDispatch(blockEditorStore);
    useEffect(() => {
      if (ref || !navigationFallbackId) {
        return;
      }
      __unstableMarkNextChangeAsNotPersistent();
      setRef(navigationFallbackId);
    }, [
      ref,
      setRef,
      navigationFallbackId,
      __unstableMarkNextChangeAsNotPersistent,
    ]);

    // render block
    return (
      <>
        <MenuInspectorControls
          clientId={clientId}
          currentMenuId={ref}
          isNavigationMenuMissing={isNavigationMenuMissing}
          isManageMenusButtonDisabled={isManageMenusButtonDisabled}
          onSelectNavigationMenu={onSelectNavigationMenu}
          isLoading={isLoading}
          blockEditingMode={blockEditingMode}
        />
        <button className="fblgstp-side-menu-button">
          <i class="bi bi-list"></i>
        </button>
      </>
    );
  },
});
