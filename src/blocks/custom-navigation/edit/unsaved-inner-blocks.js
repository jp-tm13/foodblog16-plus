// wordpress dependencies
import { useInnerBlocksProps } from "@wordpress/block-editor";
import { Disabled } from "@wordpress/components";
import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { useContext, useEffect, useRef } from "@wordpress/element";

// internal dependencies
import { checkBlocks } from "./utils";
import { DEFAULT_BLOCK, SELECT_NAVIGATION_MENUS_ARGS } from "../constants";

// constants
const EMPTY_OBJECT = {};

export default function UnsavedInnerBlocks({
  blocks,
  createNavigationMenu,
  hasSelection,
}) {
  const originalBlocksRef = useRef();

  useEffect(() => {
    if (!originalBlocksRef?.current) {
      originalBlocksRef.current = blocks;
    }
  }, [blocks]);

  // check if inner blocks have been changed by user, i.e. they are 'dirty'
  const innerBlocksAreDirty = checkBlocks(originalBlocksRef?.current, blocks);

  // disabled for avoiding the side-effects for block previews
  const isDisabled = useContext(Disabled.Context);

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "wp-block-foodblog16-plus-custom-navigation__container",
    },
    {
      renderAppender: hasSelection ? undefined : false,
      defaultBlock: DEFAULT_BLOCK,
      directInsert: true,
    }
  );

  const { isSaving, hasResolvedAllNavigationMenus } = useSelect(
    (select) => {
      if (isDisabled) {
        return EMPTY_OBJECT;
      }

      const { hasFinishedResolution, isSavingEntityRecord } = select(coreStore);

      return {
        isSaving: isSavingEntityRecord("postType", "wp_navigation"),
        hasResolvedAllNavigationMenus: hasFinishedResolution(
          "getEntityRecords",
          SELECT_NAVIGATION_MENUS_ARGS
        ),
      };
    },
    [isDisabled]
  );

  // automatically save the uncontrolled blocks
  useEffect(() => {
    if (
      isDisabled ||
      isSaving ||
      !hasResolvedAllNavigationMenus ||
      !hasSelection ||
      !innerBlocksAreDirty
    ) {
      return;
    }

    createNavigationMenu(null, blocks);
  }, [
    blocks,
    createNavigationMenu,
    isDisabled,
    isSaving,
    hasResolvedAllNavigationMenus,
    innerBlocksAreDirty,
    hasSelection,
  ]);

  const Wrapper = isSaving ? Disabled : "div";

  return <Wrapper {...innerBlocksProps} />;
}
