// wordpress dependencies
import {
  Button,
  __experimentalConfirmDialog as ConfirmDialog,
} from "@wordpress/components";
import { store as coreStore, useEntityId } from "@wordpress/core-data";
import { useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function NavigationMenuDeleteControl({ onDelete }) {
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const id = useEntityId("postType", "wp_navigation");
  const { deleteEntityRecord } = useDispatch(coreStore);

  return (
    <>
      <Button
        __next40pxDefaultSize
        className="wp-block-foodblog16-plus-custom-navigation-delete-menu-button"
        variant="secondary"
        isDestructive
        onClick={() => {
          setIsConfirmDialogVisible(true);
        }}
      >
        {__("Delete menu", "foodblog16-plus")}
      </Button>
      {isConfirmDialogVisible && (
        <ConfirmDialog
          isOpen
          onConfirm={() => {
            deleteEntityRecord("postType", "wp_navigation", id, {
              force: true,
            });
            onDelete();
          }}
          onCancel={() => {
            setIsConfirmDialogVisible(false);
          }}
          confirmButtonText={__("Delete", "foodblog16-plus")}
          size="medium"
        >
          {__(
            "Are you sure you want to delete this Navigation Menu?",
            "foodblog16-plus"
          )}
        </ConfirmDialog>
      )}
    </>
  );
}
