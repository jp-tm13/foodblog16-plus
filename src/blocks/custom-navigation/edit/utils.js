// external dependencies
import clsx from "clsx";

/**
 * conditionally compares two candidates for deep equality
 *
 * @param {*}                  x          1st candidate for comparison
 * @param {*}                  y          2nd candidate for comparison
 * @param {Function|undefined} shouldSkip a function which can be used to skip a given property of an object
 * @return {boolean}                      whether the two candidates are deeply equal
 */
const isDeepEqual = (x, y, shouldSkip) => {
  if (x === y) {
    return true;
  } else if (
    typeof x === "object" &&
    x !== null &&
    x !== undefined &&
    typeof y === "object" &&
    y !== null &&
    y !== undefined
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }

    for (const prop in x) {
      if (y.hasOwnProperty(prop)) {
        // Afford skipping a given property of an object.
        if (shouldSkip && shouldSkip(prop, x)) {
          return true;
        }

        if (!isDeepEqual(x[prop], y[prop], shouldSkip)) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  }

  return false;
};

export function checkBlocks(originalBlocks, blocks) {
  return !isDeepEqual(originalBlocks, blocks, (prop, x) => {
    if (x?.name === "core/page-list" && prop === "innerBlocks") {
      return true;
    }
  });
}

function getComputedStyle(node) {
  return node.ownerDocument.defaultView.getComputedStyle(node);
}

export function detectColors(colorsDetectionElement, setColor, setBackground) {
  if (!colorsDetectionElement) {
    return;
  }
  setColor(getComputedStyle(colorsDetectionElement).color);

  let backgroundColorNode = colorsDetectionElement;
  let backgroundColor = getComputedStyle(backgroundColorNode).backgroundColor;
  while (
    backgroundColor === "rgba(0, 0, 0, 0)" &&
    backgroundColorNode.parentNode &&
    backgroundColorNode.parentNode.nodeType ===
      backgroundColorNode.parentNode.ELEMENT_NODE
  ) {
    backgroundColorNode = backgroundColorNode.parentNode;
    backgroundColor = getComputedStyle(backgroundColorNode).backgroundColor;
  }

  setBackground(backgroundColor);
}
