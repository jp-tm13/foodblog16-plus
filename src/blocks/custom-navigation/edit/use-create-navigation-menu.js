// wordpress dependencies
import { serialize } from "@wordpress/blocks";
import { store as coreStore } from "@wordpress/core-data";
import { useDispatch } from "@wordpress/data";
import { useState, useCallback } from "@wordpress/element";

// internal dependencies
import useGenerateDefaultNavigationTitle from "./use-generate-default-navigation-title";

export const CREATE_NAVIGATION_MENU_SUCCESS = "success";
export const CREATE_NAVIGATION_MENU_ERROR = "error";
export const CREATE_NAVIGATION_MENU_PENDING = "pending";
export const CREATE_NAVIGATION_MENU_IDLE = "idle";

export default function useCreateNavigationMenu(clientId) {
  // set initial values
  const [status, setStatus] = useState(CREATE_NAVIGATION_MENU_IDLE);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const { saveEntityRecord, editEntityRecord } = useDispatch(coreStore);
  const generateDefaultTitle = useGenerateDefaultNavigationTitle(clientId);

  // callback uses data from the two placeholder steps and only creates a new
  // navigation menu when the final step is completed
  const create = useCallback(
    async (title = null, blocks = [], postStatus) => {
      // check if supplied title is a string
      if (title && typeof title !== "string") {
        setError("Invalid title supplied when creating Navigation Menu.");
        setStatus(CREATE_NAVIGATION_MENU_ERROR);
        throw new Error(`Value of supplied title argument was not a string.`);
      }

      // update status
      setStatus(CREATE_NAVIGATION_MENU_PENDING);
      setValue(null);
      setError(null);

      // generate title if none exists
      if (!title) {
        title = await generateDefaultTitle().catch((err) => {
          setError(err?.message);
          setStatus(CREATE_NAVIGATION_MENU_ERROR);
          throw new Error(
            "Failed to create title when saving new Navigation Menu.",
            {
              cause: err,
            }
          );
        });
      }
      const record = {
        title,
        content: serialize(blocks),
        status: postStatus,
      };

      // return affords ability to await on this function directly
      return saveEntityRecord("postType", "wp_navigation", record)
        .then((response) => {
          setValue(response);
          setStatus(CREATE_NAVIGATION_MENU_SUCCESS);

          // set the status to publish so that the navigation block
          // shows up in the multi entity save flow
          if (postStatus !== "publish") {
            editEntityRecord("postType", "wp_navigation", response.id, {
              status: "publish",
            });
          }

          return response;
        })
        .catch((err) => {
          setError(err?.message);
          setStatus(CREATE_NAVIGATION_MENU_ERROR);
          throw new Error("Unable to save new Navigation Menu", {
            cause: err,
          });
        });
    },
    [saveEntityRecord, editEntityRecord, generateDefaultTitle]
  );

  return {
    create,
    status,
    value,
    error,
    isIdle: status === CREATE_NAVIGATION_MENU_IDLE,
    isPending: status === CREATE_NAVIGATION_MENU_PENDING,
    isSuccess: status === CREATE_NAVIGATION_MENU_SUCCESS,
    isError: status === CREATE_NAVIGATION_MENU_ERROR,
  };
}
