// wordpress dependencies
import {
  MenuGroup,
  MenuItem,
  MenuItemsChoice,
  DropdownMenu,
} from "@wordpress/components";
import { moreVertical } from "@wordpress/icons";
import { __, sprintf } from "@wordpress/i18n";
import { decodeEntities } from "@wordpress/html-entities";
import { useEffect, useMemo, useState } from "@wordpress/element";
import { useEntityProp } from "@wordpress/core-data";

// internal dependencies
import useNavigationMenu from "./use-navigation-menu";

// construct the current menu label
function buildMenuLabel(title, id, status) {
  if (!title) {
    return sprintf(__("(no title %s)", "foodblog16-plus"), id);
  }

  if (status === "publish") {
    return decodeEntities(title);
  }

  return sprintf(
    __("%1$s (%2$s)", "foodblog16-plus"),
    decodeEntities(title),
    status
  );
}

// actual selector component
function NavigationMenuSelector({
  currentMenuId,
  onSelectNavigationMenu,
  actionLabel,
}) {
  const createActionLabel = __("Create from '%s'", "foodblog16-plus");

  const [isUpdatingMenuRef, setIsUpdatingMenuRef] = useState(false);

  actionLabel = actionLabel || createActionLabel;

  const {
    navigationMenus,
    isResolvingNavigationMenus,
    hasResolvedNavigationMenus,
    canUserCreateNavigationMenus,
    canSwitchNavigationMenu,
    isNavigationMenuMissing,
  } = useNavigationMenu(currentMenuId);

  const [currentTitle] = useEntityProp("postType", "wp_navigation", "title");

  const menuChoices = useMemo(() => {
    return (
      navigationMenus?.map(({ id, title, status }, index) => {
        const label = buildMenuLabel(title?.rendered, index + 1, status);

        return {
          value: id,
          label,
          ariaLabel: sprintf(actionLabel, label),
          disabled:
            isUpdatingMenuRef ||
            isResolvingNavigationMenus ||
            !hasResolvedNavigationMenus,
        };
      }) || []
    );
  }, [
    navigationMenus,
    actionLabel,
    isResolvingNavigationMenus,
    hasResolvedNavigationMenus,
    isUpdatingMenuRef,
  ]);

  const hasNavigationMenus = !!navigationMenus?.length;
  const showNavigationMenus = !!canSwitchNavigationMenu;

  const noMenuSelected = hasNavigationMenus && !currentMenuId;
  const noBlockMenus = !hasNavigationMenus && hasResolvedNavigationMenus;
  const menuUnavailable = hasResolvedNavigationMenus && currentMenuId === null;
  const navMenuHasBeenDeleted = currentMenuId && isNavigationMenuMissing;

  let selectorLabel = "";

  if (isResolvingNavigationMenus) {
    selectorLabel = __("Loading…", "foodblog16-plus");
  } else if (
    noMenuSelected ||
    noBlockMenus ||
    menuUnavailable ||
    navMenuHasBeenDeleted
  ) {
    selectorLabel = __("Choose a Navigation Menu", "foodblog16-plus");
  } else {
    // Current Menu's title.
    selectorLabel = currentTitle;
  }

  useEffect(() => {
    if (isUpdatingMenuRef) {
      setIsUpdatingMenuRef(false);
    }
  }, [
    hasResolvedNavigationMenus,
    canUserCreateNavigationMenus,
    isUpdatingMenuRef,
    menuUnavailable,
    noBlockMenus,
    noMenuSelected,
  ]);

  const NavigationMenuSelectorDropdown = (
    <DropdownMenu
      label={selectorLabel}
      icon={moreVertical}
      toggleProps={{ size: "small" }}
    >
      {({ onClose }) => (
        <>
          {showNavigationMenus && hasNavigationMenus && (
            <MenuGroup label={__("Menus", "foodblog16-plus")}>
              <MenuItemsChoice
                value={currentMenuId}
                onSelect={(menuId) => {
                  onSelectNavigationMenu(menuId);
                  onClose();
                }}
                choices={menuChoices}
              />
            </MenuGroup>
          )}
        </>
      )}
    </DropdownMenu>
  );

  return NavigationMenuSelectorDropdown;
}

export default NavigationMenuSelector;
