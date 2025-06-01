import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, CheckboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import block from "./block.json";
import icons from "../../icons/icons.js";
import "./main.css";

registerBlockType(block.name, {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    const { showAuth } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "foodblog16-plus")}>
            <CheckboxControl
              label={__("Show Login/Register Link", "foodblog16-plus")}
              help={
                showAuth
                  ? __("Showing link", "foodblog16-plus")
                  : __("Hiding link", "foodblog16-plus")
              }
              checked={showAuth}
              onChange={(showAuth) => setAttributes({ showAuth })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {showAuth && (
            <a className="signin-link open-modal" href="#">
              <div className="signin-icon">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="signin-text">
                <small>Hello, Sign in</small>
                My Account
              </div>
            </a>
          )}
        </div>
      </>
    );
  },
});
