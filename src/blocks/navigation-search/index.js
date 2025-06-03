// wordpress dependencies
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

// internal dependencies
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
