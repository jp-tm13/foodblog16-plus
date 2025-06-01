// wordpress dependencies
import { useEntityBlockEditor } from "@wordpress/core-data";
import {
  useInnerBlocksProps,
  InnerBlocks,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";

// internal dependencies
import PlaceholderPreview from "./placeholder-preview";
import { DEFAULT_BLOCK, PRIORITIZED_INSERTER_BLOCKS } from "../constants";

export default function NavigationInnerBlocks({
  clientId,
  hasCustomPlaceholder,
  orientation,
  templateLock,
}) {
  const {
    isImmediateParentOfSelectedBlock,
    selectedBlockHasChildren,
    isSelected,
  } = useSelect(
    (select) => {
      const { getBlockCount, hasSelectedInnerBlock, getSelectedBlockClientId } =
        select(blockEditorStore);
      const selectedBlockId = getSelectedBlockClientId();

      return {
        isImmediateParentOfSelectedBlock: hasSelectedInnerBlock(
          clientId,
          false
        ),
        selectedBlockHasChildren: !!getBlockCount(selectedBlockId),
        isSelected: selectedBlockId === clientId,
      };
    },
    [clientId]
  );

  const [blocks, onInput, onChange] = useEntityBlockEditor(
    "postType",
    "wp_navigation"
  );

  const parentOrChildHasSelection =
    isSelected ||
    (isImmediateParentOfSelectedBlock && !selectedBlockHasChildren);

  const placeholder = useMemo(() => <PlaceholderPreview />, []);

  const hasMenuItems = !!blocks?.length;

  const showPlaceholder = !hasCustomPlaceholder && !hasMenuItems && !isSelected;

  const ALLOWED_BLOCKS = [
    "core/navigation-link",
    "core/search",
    "core/social-links",
    "core/page-list",
    "core/spacer",
    "core/home-link",
    "core/site-title",
    "core/site-logo",
    "core/navigation-submenu",
    "core/loginout",
    "core/buttons",
  ];

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "wp-block-foodblog16-plus-custom-navigation__container",
    },
    {
      value: blocks,
      onInput,
      onChange,
      allowedBlocks: ALLOWED_BLOCKS,
      prioritizedInserterBlocks: PRIORITIZED_INSERTER_BLOCKS,
      defaultBlock: DEFAULT_BLOCK,
      directInsert: true,
      orientation,
      templateLock,
      renderAppender:
        isSelected ||
        (isImmediateParentOfSelectedBlock && !selectedBlockHasChildren) ||
        parentOrChildHasSelection
          ? InnerBlocks.ButtonBlockAppender
          : false,
      placeholder: showPlaceholder ? placeholder : undefined,
      __experimentalCaptureToolbars: true,
      __unstableDisableLayoutClassNames: true,
    }
  );

  return <div {...innerBlocksProps} />;
}
