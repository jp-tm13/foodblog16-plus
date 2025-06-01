import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import block from "./block.json";
import icons from "../../icons/icons.js";
import "./main.css";

registerBlockType(block.name, {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    const { content, showCategory } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "foodblog16-plus")}>
            <ToggleControl
              label={__("Show Category", "foodblog16-plus")}
              help={
                showCategory
                  ? __("Category shown", "foodblog16-plus")
                  : __("Custom content shown", "foodblog16-plus")
              }
              checked={showCategory}
              onChange={(showCategory) => setAttributes({ showCategory })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <div className="inner-page-header">
            {showCategory ? (
              <h1>{__("Category: Some Category", "foodblog16-plus")}</h1>
            ) : (
              <RichText
                tagName="h1"
                placeholder={__("Heading", "foodblog16-plus")}
                value={content}
                onChange={(content) => setAttributes({ content })}
              />
            )}
          </div>
        </div>
      </>
    );
  },
});
