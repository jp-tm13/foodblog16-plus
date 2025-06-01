import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import block from "./block.json";
import icons from "../../icons/icons.js";
import "./main.css";

registerBlockType(block.name, {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    const { showRegister } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "foodblog16-plus")}>
            <ToggleControl
              label={__("Show Register", "foodblog16-plus")}
              help={
                showRegister
                  ? __("Showing registration form.", "foodblog16-plus")
                  : __("Hiding registration form.", "foodblog16-plus")
              }
              checked={showRegister}
              onChange={(showRegister) => setAttributes({ showRegister })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {__(
            "This block is not previewable from the editor. View your site for a live demo.",
            "foodblog16-plus"
          )}
        </div>
      </>
    );
  },
});
