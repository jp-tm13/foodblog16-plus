import { registerBlockType } from "@wordpress/blocks";
import useBlockProps from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import block from "./block.json";
import search from "../../icons/search";
import "./main.css";

registerBlockType(block.name, {
  icon: search.primary,
  edit() {
    return (
      <button className="fblgstp-search-button">
        <i className="bi bi-search"></i>
      </button>
    );
  },
});
