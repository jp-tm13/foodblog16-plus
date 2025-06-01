import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  useBlockProps,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ColorPalette } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import block from "./block.json";
import "./main.css";

registerBlockType(block.name, {
  edit({ attributes, setAttributes }) {
    // get access to 'content' from 'attributes' parameter
    const { content, underline_color } = attributes;
    // add support for block customization using 'BlockProps'
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Colors", "foodblog16-plus")}>
            <ColorPalette
              colors={[
                { name: "Red", color: "#F87171" },
                { name: "Indigo", color: "#818CF8" },
              ]}
              value={underline_color}
              onChange={(newVal) => setAttributes({ underline_color: newVal })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <RichText
            className="custom-header"
            tagName="h2"
            placeholder={__("Heading", "foodblog16-plus")}
            value={content}
            onChange={(newVal) => setAttributes({ content: newVal })}
            allowedFormats={["core/bold", "core/italic"]}
          />
        </div>
      </>
    );
  },
  save({ attributes }) {
    const { content, underline_color } = attributes;
    const blockProps = useBlockProps.save({
      className: "custom-header",
      style: {
        "background-image": `
          linear-gradient(transparent, transparent),
          linear-gradient(${underline_color}, ${underline_color});
        `,
      },
    });

    return <RichText.Content {...blockProps} tagName="h2" value={content} />;
  },
});
