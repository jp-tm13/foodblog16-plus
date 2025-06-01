// wordpress dependencies
import {
  store as coreStore,
  useResourcePermissions,
  useEntityRecords,
} from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";

// constants
const PRELOADED_NAVIGATION_MENUS_QUERY = {
  per_page: 100,
  status: ["publish", "draft"],
  order: "desc",
  orderby: "date",
};

export default function useNavigationMenu(ref) {
  const permissions = useResourcePermissions({
    kind: "postType",
    name: "wp_navigation",
    id: ref,
  });

  const { navigationMenu, isNavigationMenuResolved, isNavigationMenuMissing } =
    useSelect(
      (select) => {
        return selectExistingMenu(select, ref);
      },
      [ref]
    );

  const {
    // check if user can create navigation menus
    canCreate: canCreateNavigationMenus,
    // check if user can update the specific menu with given post ID
    canUpdate: canUpdateNavigationMenu,
    // check if user can delete the specific menu with given post ID
    canDelete: canDeleteNavigationMenu,
    isResolving: isResolvingPermissions,
    hasResolved: hasResolvedPermissions,
  } = permissions;

  const {
    records: navigationMenus,
    isResolving: isResolvingNavigationMenus,
    hasResolved: hasResolvedNavigationMenus,
  } = useEntityRecords(
    "postType",
    `wp_navigation`,
    PRELOADED_NAVIGATION_MENUS_QUERY
  );

  const canSwitchNavigationMenu = ref
    ? navigationMenus?.length > 1
    : navigationMenus?.length > 0;

  return {
    navigationMenu,
    isNavigationMenuResolved,
    isNavigationMenuMissing,
    navigationMenus,
    isResolvingNavigationMenus,
    hasResolvedNavigationMenus,
    canSwitchNavigationMenu,
    canUserCreateNavigationMenus: canCreateNavigationMenus,
    isResolvingCanUserCreateNavigationMenus: isResolvingPermissions,
    hasResolvedCanUserCreateNavigationMenus: hasResolvedPermissions,
    canUserUpdateNavigationMenu: canUpdateNavigationMenu,
    hasResolvedCanUserUpdateNavigationMenu: ref
      ? hasResolvedPermissions
      : undefined,
    canUserDeleteNavigationMenu: canDeleteNavigationMenu,
    hasResolvedCanUserDeleteNavigationMenu: ref
      ? hasResolvedPermissions
      : undefined,
  };
}

function selectExistingMenu(select, ref) {
  if (!ref) {
    return {
      isNavigationMenuResolved: false,
      isNavigationMenuMissing: true,
    };
  }

  const { getEntityRecord, getEditedEntityRecord, hasFinishedResolution } =
    select(coreStore);

  const args = ["postType", "wp_navigation", ref];
  const navigationMenu = getEntityRecord(...args);
  const editedNavigationMenu = getEditedEntityRecord(...args);
  const hasResolvedNavigationMenu = hasFinishedResolution(
    "getEditedEntityRecord",
    args
  );

  // only published Navigation posts are considered valid; drafts need to be
  // published to show on the front end
  const isNavigationMenuPublishedOrDraft =
    editedNavigationMenu.status === "publish" ||
    editedNavigationMenu.status === "draft";

  return {
    isNavigationMenuResolved: hasResolvedNavigationMenu,
    isNavigationMenuMissing:
      hasResolvedNavigationMenu &&
      (!navigationMenu || !isNavigationMenuPublishedOrDraft),

    // getEditedEntityRecord will return the post regardless of status; if not
    // published it should be ignored
    navigationMenu: isNavigationMenuPublishedOrDraft
      ? editedNavigationMenu
      : null,
  };
}
