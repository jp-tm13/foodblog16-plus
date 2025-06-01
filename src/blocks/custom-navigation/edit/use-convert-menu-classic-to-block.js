// wordpress dependencies
import { useRegistry, useDispatch } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { useState, useCallback } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";

// internal dependencies
import menuItemsToBlocks from "./menu-items-to-blocks";

// constants
export const CLASSIC_MENU_CONVERSION_SUCCESS = "success";
export const CLASSIC_MENU_CONVERSION_ERROR = "error";
export const CLASSIC_MENU_CONVERSION_PENDING = "pending";
export const CLASSIC_MENU_CONVERSION_IDLE = "idle";

// neccessary so multiple components using this hook do not import the same
// menu twice
let classicMenuBeingConvertedId = null;

function useConvertClassicToBlockMenu(
  createNavigationMenu,
  { throwOnError = false } = {}
) {
  const registry = useRegistry();
  const { editEntityRecord } = useDispatch(coreStore);

  const [status, setStatus] = useState(CLASSIC_MENU_CONVERSION_IDLE);
  const [error, setError] = useState(null);

  const convertClassicMenuToBlockMenu = useCallback(
    async (menuId, menuName, postStatus = "publish") => {
      let navigationMenu;
      let classicMenuItems;

      // 1. Fetch the classic Menu items.
      try {
        classicMenuItems = await registry
          .resolveSelect(coreStore)
          .getMenuItems({
            menus: menuId,
            per_page: -1,
            context: "view",
          });
      } catch (err) {
        throw new Error(
          sprintf(
            __(
              `Unable to fetch classic menu "%s" from API.`,
              "foodblog16-plus"
            ),
            menuName
          ),
          {
            cause: err,
          }
        );
      }

      // Handle offline response which resolves to `null`.
      if (classicMenuItems === null) {
        throw new Error(
          sprintf(
            // translators: %s: The name of a menu (e.g. Header menu).
            __(
              `Unable to fetch classic menu "%s" from API.`,
              "foodblog16-plus"
            ),
            menuName
          )
        );
      }

      // 2. Convert the classic items into blocks.
      const { innerBlocks } = menuItemsToBlocks(classicMenuItems);

      // 3. Create the `wp_navigation` Post with the blocks.
      try {
        navigationMenu = await createNavigationMenu(
          menuName,
          innerBlocks,
          postStatus
        );

        await editEntityRecord(
          "postType",
          "wp_navigation",
          navigationMenu.id,
          {
            status: "publish",
          },
          { throwOnError: true }
        );
      } catch (err) {
        throw new Error(
          sprintf(
            __(`Unable to create Navigation Menu "%s".`, "foodblog16-plus"),
            menuName
          ),
          {
            cause: err,
          }
        );
      }

      return navigationMenu;
    },
    [createNavigationMenu, editEntityRecord, registry]
  );

  const convert = useCallback(
    async (menuId, menuName, postStatus) => {
      // Check whether this classic menu is being imported already.
      if (classicMenuBeingConvertedId === menuId) {
        return;
      }

      // Set the ID for the currently importing classic menu.
      classicMenuBeingConvertedId = menuId;

      if (!menuId || !menuName) {
        setError("Unable to convert menu. Missing menu details.");
        setStatus(CLASSIC_MENU_CONVERSION_ERROR);
        return;
      }

      setStatus(CLASSIC_MENU_CONVERSION_PENDING);
      setError(null);

      return await convertClassicMenuToBlockMenu(menuId, menuName, postStatus)
        .then((navigationMenu) => {
          setStatus(CLASSIC_MENU_CONVERSION_SUCCESS);
          // Reset the ID for the currently importing classic menu.
          classicMenuBeingConvertedId = null;
          return navigationMenu;
        })
        .catch((err) => {
          setError(err?.message);
          // Reset the ID for the currently importing classic menu.
          setStatus(CLASSIC_MENU_CONVERSION_ERROR);

          // Reset the ID for the currently importing classic menu.
          classicMenuBeingConvertedId = null;

          // Rethrow error for debugging.
          if (throwOnError) {
            throw new Error(
              sprintf(
                // translators: %s: The name of a menu (e.g. Header menu).
                __(`Unable to create Navigation Menu "%s".`, "foodblog16-plus"),
                menuName
              ),
              {
                cause: err,
              }
            );
          }
        });
    },
    [convertClassicMenuToBlockMenu, throwOnError]
  );

  return {
    convert,
    status,
    error,
  };
}

export default useConvertClassicToBlockMenu;
