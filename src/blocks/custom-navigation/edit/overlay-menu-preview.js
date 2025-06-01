// wordpress dependencies
import {
  ToggleControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

// internal dependencies
import OverlayMenuIcon from "./overlay-menu-icon";

export default function OverlayMenuPreview({ setAttributes, hasIcon, icon }) {
  return (
    <>
      <ToggleControl
        __nextHasNoMarginBottom
        label={__("Show icon button", "foodblog16-plus")}
        help={__(
          "Configure the visual appearance of the button that toggles the overlay menu.",
          "foodblog16-plus"
        )}
        onChange={(value) => setAttributes({ hasIcon: value })}
        checked={hasIcon}
      />

      <ToggleGroupControl
        __next40pxDefaultSize
        __nextHasNoMarginBottom
        className="wp-block-foodblog16-plus-custom-navigation__overlay-menu-icon-toggle-group"
        label={__("Icon", "foodblog16-plus")}
        value={icon}
        onChange={(value) => setAttributes({ icon: value })}
        isBlock
      >
        <ToggleGroupControlOption
          value="handle"
          aria-label={__("handle", "foodblog16-plus")}
          label={<OverlayMenuIcon icon="handle" />}
        />
        <ToggleGroupControlOption
          value="menu"
          aria-label={__("menu", "foodblog16-plus")}
          label={<OverlayMenuIcon icon="menu" />}
        />
      </ToggleGroupControl>
    </>
  );
}
