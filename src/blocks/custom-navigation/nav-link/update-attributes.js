// wordpress dependencies
import { escapeHTML } from "@wordpress/escape-html";
import { safeDecodeURI } from "@wordpress/url";

// see core/navigation-link for more info, as this is simply a copy to make out
// menu able to use wordpress native navigation links
/**
 * @typedef {'post-type'|'custom'|'taxonomy'|'post-type-archive'} WPNavigationLinkKind
 */
/**
 * navigation Link Block Attributes
 *
 * @typedef {Object} WPNavigationLinkBlockAttributes
 *
 * @property {string}               [label]         link text
 * @property {WPNavigationLinkKind} [kind]          kind is used to differentiate between term and post ids to check post draft status
 * @property {string}               [type]          type such as post, page, tag, category and other custom types
 * @property {string}               [rel]           relationship of the linked URL
 * @property {number}               [id]            a post or term id
 * @property {boolean}              [opensInNewTab] sets link target to _blank when true
 * @property {string}               [url]           link href
 */
/**
 * link Control onChange handler that updates block attributes when a setting is changed
 *
 * @param {Object}                          updatedValue    new block attributes to update
 * @param {Function}                        setAttributes   block attribute update function
 * @param {WPNavigationLinkBlockAttributes} blockAttributes current block attributes
 */

export const updateAttributes = (
  updatedValue = {},
  setAttributes,
  blockAttributes = {}
) => {
  const {
    label: originalLabel = "",
    kind: originalKind = "",
    type: originalType = "",
  } = blockAttributes;

  const {
    title: newLabel = "",
    url: newUrl = "",
    opensInNewTab,
    id,
    kind: newKind = originalKind,
    type: newType = originalType,
  } = updatedValue;

  const newLabelWithoutHttp = newLabel.replace(/http(s?):\/\//gi, "");
  const newUrlWithoutHttp = newUrl.replace(/http(s?):\/\//gi, "");

  const useNewLabel =
    newLabel &&
    newLabel !== originalLabel &&
    newLabelWithoutHttp !== newUrlWithoutHttp;

  const label = useNewLabel
    ? escapeHTML(newLabel)
    : originalLabel || escapeHTML(newUrlWithoutHttp);

  const type = newType === "post_tag" ? "tag" : newType.replace("-", "_");

  const isBuiltInType = ["post", "page", "tag", "category"].indexOf(type) > -1;

  const isCustomLink = (!newKind && !isBuiltInType) || newKind === "custom";
  const kind = isCustomLink ? "custom" : newKind;

  setAttributes({
    ...(newUrl && { url: encodeURI(safeDecodeURI(newUrl)) }),
    ...(label && { label }),
    ...(undefined !== opensInNewTab && { opensInNewTab }),
    ...(id && Number.isInteger(id) && { id }),
    ...(kind && { kind }),
    ...(type && type !== "URL" && { type }),
  });
};
