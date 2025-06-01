// wordpress dependencies
import { createBlock, parse } from "@wordpress/blocks";
import { applyFilters } from "@wordpress/hooks";

// convert a flat menu item structure to a nested blocks structure
export default function menuItemsToBlocks(menuItems) {
  if (!menuItems) {
    return null;
  }

  const menuTree = createDataTree(menuItems);
  const blocks = mapMenuItemsToBlocks(menuTree);
  return applyFilters(
    "blocks.navigation.__unstableMenuItemsToBlocks",
    blocks,
    menuItems
  );
}

// recursive function mapping menu item nodes to blocks
function mapMenuItemsToBlocks(menuItems, level = 0) {
  let mapping = {};

  // The menuItem should be in menu_order sort order.
  const sortedItems = [...menuItems].sort(
    (a, b) => a.menu_order - b.menu_order
  );

  const innerBlocks = sortedItems.map((menuItem) => {
    if (menuItem.type === "block") {
      const [block] = parse(menuItem.content.raw);

      if (!block) {
        return createBlock("core/freeform", {
          content: menuItem.content,
        });
      }

      return block;
    }

    const blockType = menuItem.children?.length
      ? "core/navigation-submenu"
      : "core/navigation-link";

    const attributes = menuItemToBlockAttributes(menuItem, blockType, level);

    // ff there are children recurse to build those nested blocks
    const {
      innerBlocks: nestedBlocks = [], // alias to avoid shadowing
      mapping: nestedMapping = {}, // alias to avoid shadowing
    } = menuItem.children?.length
      ? mapMenuItemsToBlocks(menuItem.children, level + 1)
      : {};

    // update parent mapping with nested mapping
    mapping = {
      ...mapping,
      ...nestedMapping,
    };

    // create block with nested "innerBlocks"
    const block = createBlock(blockType, attributes, nestedBlocks);

    // create mapping for menuItem -> block
    mapping[menuItem.id] = block.clientId;

    return block;
  });

  return {
    innerBlocks,
    mapping,
  };
}

// a nav_menu_item object
function menuItemToBlockAttributes(
  {
    title: menuItemTitleField,
    xfn,
    classes,
    attr_title,
    object,
    object_id,
    description,
    url,
    type: menuItemTypeField,
    target,
  },
  blockType,
  level
) {
  if (object && object === "post_tag") {
    object = "tag";
  }

  return {
    label: menuItemTitleField?.rendered || "",
    ...(object?.length && {
      type: object,
    }),
    kind: menuItemTypeField?.replace("_", "-") || "custom",
    url: url || "",
    ...(xfn?.length &&
      xfn.join(" ").trim() && {
        rel: xfn.join(" ").trim(),
      }),
    ...(classes?.length &&
      classes.join(" ").trim() && {
        className: classes.join(" ").trim(),
      }),
    /* eslint-disable camelcase */
    ...(attr_title?.length && {
      title: attr_title,
    }),
    ...(object_id &&
      "custom" !== object && {
        id: object_id,
      }),
    /* eslint-enable camelcase */
    ...(description?.length && {
      description,
    }),
    ...(target === "_blank" && {
      opensInNewTab: true,
    }),
    ...(blockType === "core/navigation-submenu" && {
      isTopLevelItem: level === 0,
    }),
    ...(blockType === "core/navigation-link" && {
      isTopLevelLink: level === 0,
    }),
  };
}

// creates a nested, hierarchical tree representation from unstructured data
// that has an inherent relationship defined between individual items
function createDataTree(dataset, id = "id", relation = "parent") {
  const hashTable = Object.create(null);
  const dataTree = [];

  for (const data of dataset) {
    hashTable[data[id]] = {
      ...data,
      children: [],
    };
    if (data[relation]) {
      hashTable[data[relation]] = hashTable[data[relation]] || {};
      hashTable[data[relation]].children =
        hashTable[data[relation]].children || [];
      hashTable[data[relation]].children.push(hashTable[data[id]]);
    } else {
      dataTree.push(hashTable[data[id]]);
    }
  }

  return dataTree;
}
