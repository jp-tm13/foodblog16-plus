// wordpress dependencies
import { registerBlockType } from "@wordpress/blocks";
// internal dependencies
import block from "./block.json";
import icons from "../../icons/icons.js";
import edit from "./edit";
import save from "./save";
import "./main.css";

registerBlockType(block.name, {
  icon: icons.primary,
  edit,
  save,
});
