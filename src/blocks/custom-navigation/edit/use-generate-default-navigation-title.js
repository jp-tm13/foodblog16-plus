// wordpress dependencies
import { Disabled } from "@wordpress/components";
import { store as coreStore } from "@wordpress/core-data";
import { useRegistry } from "@wordpress/data";
import { useContext, useCallback } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";

const DRAFT_MENU_PARAMS = [
  "postType",
  "wp_navigation",
  { status: "draft", per_page: -1 },
];

const PUBLISHED_MENU_PARAMS = [
  "postType",
  "wp_navigation",
  { per_page: -1, status: "publish" },
];

export default function useGenerateDefaultNavigationTitle(clientId) {
  // the block will be disabled in a block preview, use this as a way of
  // avoiding the side-effects of this component for block previews
  const isDisabled = useContext(Disabled.Context);

  const registry = useRegistry();
  return useCallback(async () => {
    // ensure other navigation menus have loaded so an
    // accurate name can be created.
    if (isDisabled) {
      return "";
    }
    const { getEntityRecords } = registry.resolveSelect(coreStore);

    // get existing menus from registry
    const [draftNavigationMenus, navigationMenus] = await Promise.all([
      getEntityRecords(...DRAFT_MENU_PARAMS),
      getEntityRecords(...PUBLISHED_MENU_PARAMS),
    ]);

    const title = __("Navigation", "foodblog16-plus");

    // determine how many menus start with the automatic title
    const matchingMenuTitleCount = [
      ...draftNavigationMenus,
      ...navigationMenus,
    ].reduce(
      (count, menu) =>
        menu?.title?.raw?.startsWith(title) ? count + 1 : count,
      0
    );

    // append a number to the end of the title if a menu with
    // the same name exists.
    const titleWithCount =
      matchingMenuTitleCount > 0
        ? `${title} ${matchingMenuTitleCount + 1}`
        : title;

    return titleWithCount || "";
  }, [isDisabled, registry]);
}
