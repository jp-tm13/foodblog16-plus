// wordpress dependencies
import { createBlock } from "@wordpress/blocks";
import {
  addSubmenu,
  chevronUp,
  chevronDown,
  moreVertical,
} from "@wordpress/icons";
import { DropdownMenu, MenuItem, MenuGroup } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { __, sprintf } from "@wordpress/i18n";
import { BlockTitle, store as blockEditorStore } from "@wordpress/block-editor";

// constants
const POPOVER_PROPS = {
  className: "block-editor-block-settings-menu__popover",
  placement: "bottom-start",
};

const BLOCKS_THAT_CAN_BE_CONVERTED_TO_SUBMENU = [
  "core/navigation-link",
  "core/navigation-submenu",
];

function AddSubmenuItem({
  block,
  onClose,
  expandedState,
  expand,
  setInsertedBlock,
}) {
  const { insertBlock, replaceBlock, replaceInnerBlocks } =
    useDispatch(blockEditorStore);

  const clientId = block.clientId;
  const isDisabled = !BLOCKS_THAT_CAN_BE_CONVERTED_TO_SUBMENU.includes(
    block.name
  );
  return (
    <MenuItem
      icon={addSubmenu}
      disabled={isDisabled}
      onClick={() => {
        const updateSelectionOnInsert = false;
        const newLink = createBlock("core/navigation-link");

        if (block.name === "core/navigation-submenu") {
          insertBlock(
            newLink,
            block.innerBlocks.length,
            clientId,
            updateSelectionOnInsert
          );
        } else {
          // Convert to a submenu if the block currently isn't one.
          const newSubmenu = createBlock(
            "core/navigation-submenu",
            block.attributes,
            block.innerBlocks
          );

          replaceBlock(clientId, newSubmenu);

          replaceInnerBlocks(
            newSubmenu.clientId,
            [newLink],
            updateSelectionOnInsert
          );
        }

        // sets the local List View state for the "last inserted block"
        setInsertedBlock(newLink);

        if (!expandedState[block.clientId]) {
          expand(block.clientId);
        }
        onClose();
      }}
    >
      {__("Add submenu link", "foodblog16-plus")}
    </MenuItem>
  );
}

export default function LeafMoreMenu(props) {
  const { block } = props;
  const { clientId } = block;

  const { moveBlocksDown, moveBlocksUp, removeBlocks } =
    useDispatch(blockEditorStore);

  const removeLabel = sprintf(
    __("Remove %s", "foodblog16-plus"),
    BlockTitle({ clientId, maximumLength: 25 })
  );

  const rootClientId = useSelect(
    (select) => {
      const { getBlockRootClientId } = select(blockEditorStore);

      return getBlockRootClientId(clientId);
    },
    [clientId]
  );

  return (
    <DropdownMenu
      icon={moreVertical}
      label={__("Options", "foodblog16-plus")}
      className="block-editor-block-settings-menu"
      popoverProps={POPOVER_PROPS}
      noIcons
      {...props}
    >
      {({ onClose }) => (
        <>
          <MenuGroup>
            <MenuItem
              icon={chevronUp}
              onClick={() => {
                moveBlocksUp([clientId], rootClientId);
                onClose();
              }}
            >
              {__("Move up", "foodblog16-plus")}
            </MenuItem>
            <MenuItem
              icon={chevronDown}
              onClick={() => {
                moveBlocksDown([clientId], rootClientId);
                onClose();
              }}
            >
              {__("Move down", "foodblog16-plus")}
            </MenuItem>
            <AddSubmenuItem
              block={block}
              onClose={onClose}
              expanded
              expandedState={props.expandedState}
              expand={props.expand}
              setInsertedBlock={props.setInsertedBlock}
            />
          </MenuGroup>
          <MenuGroup>
            <MenuItem
              onClick={() => {
                removeBlocks([clientId], false);
                onClose();
              }}
            >
              {removeLabel}
            </MenuItem>
          </MenuGroup>
        </>
      )}
    </DropdownMenu>
  );
}
