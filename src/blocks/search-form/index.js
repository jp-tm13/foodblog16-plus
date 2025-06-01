import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InspectorControls,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import block from "./block.json";
import icons from "../../icons/icons.js";
import "./main.css";

registerBlockType(block.name, {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    const { bgColor, textColor } = attributes;
    const blockProps = useBlockProps({
      style: {
        "background-color": bgColor,
        color: textColor,
      },
    });

    return (
      <>
        <InspectorControls>
          <PanelColorSettings
            tittle={__("Color Settings", "foodblog16-plus")}
            colorSettings={[
              {
                label: __("Background Color", "foodblog16-plus"),
                value: bgColor,
                onChange: (newVal) => setAttributes({ bgColor: newVal }),
              },
              {
                label: __("Text Color", "foodblog16-plus"),
                value: textColor,
                onChange: (newVal) => setAttributes({ textColor: newVal }),
              },
            ]}
          />
        </InspectorControls>
        <div {...blockProps}>
          <h1>Search: Your search term here</h1>
          <form>
            <input type="text" placeholder="What are you looking for?" />
            <div className="btn-wrapper">
              <button
                type="submit"
                style={{ "background-color": bgColor, color: textColor }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </>
    );
  },
});
