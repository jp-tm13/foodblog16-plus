// external dependencies
import clsx from "clsx";

// wordpress dependencies
import { close, Icon } from "@wordpress/icons";
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { getColorClassName } from "@wordpress/block-editor";

// internal dependencies
import OverlayMenuIcon from "./overlay-menu-icon";

export default function ResponsiveWrapper({
  children,
  id,
  isOpen,
  isResponsive,
  onToggle,
  isHiddenByDefault,
  overlayBackgroundColor,
  overlayTextColor,
  hasIcon,
  icon,
}) {
  if (!isResponsive) {
    return children;
  }

  const responsiveContainerClasses = clsx(
    "wp-block-foodblog16-plus-custom-navigation__responsive-container",
    {
      "has-text-color": !!overlayTextColor.color || !!overlayTextColor?.class,
      [getColorClassName("color", overlayTextColor?.slug)]:
        !!overlayTextColor?.slug,
      "has-background":
        !!overlayBackgroundColor.color || overlayBackgroundColor?.class,
      [getColorClassName("background-color", overlayBackgroundColor?.slug)]:
        !!overlayBackgroundColor?.slug,
      "is-menu-open": isOpen,
      "hidden-by-default": isHiddenByDefault,
    }
  );

  const styles = {
    color: !overlayTextColor?.slug && overlayTextColor?.color,
    backgroundColor:
      !overlayBackgroundColor?.slug &&
      overlayBackgroundColor?.color &&
      overlayBackgroundColor.color,
  };

  const openButtonClasses = clsx(
    "wp-block-foodblog16-plus-custom-navigation__responsive-container-open",
    { "always-shown": isHiddenByDefault }
  );

  const modalId = `${id}-modal`;

  const dialogProps = {
    className: "wp-block-foodblog16-plus-custom-navigation__responsive-dialog",
    ...(isOpen && {
      role: "dialog",
      "aria-modal": true,
      "aria-label": __("Menu", "foodblog16-plus"),
    }),
  };

  return (
    <>
      {!isOpen && (
        <Button
          __next40pxDefaultSize
          aria-haspopup="true"
          aria-label={hasIcon && __("Open menu", "foodblog16-plus")}
          className={openButtonClasses}
          onClick={() => onToggle(true)}
        >
          {hasIcon && <OverlayMenuIcon icon={icon} />}
          {!hasIcon && __("Menu", "foodblog16-plus")}
        </Button>
      )}

      <div className={responsiveContainerClasses} style={styles} id={modalId}>
        <div
          className="wp-block-foodblog16-plus-custom-navigation__responsive-close"
          tabIndex="-1"
        >
          <div {...dialogProps}>
            <Button
              __next40pxDefaultSize
              className="wp-block-foodblog16-plus-custom-navigation__responsive-container-close"
              aria-label={hasIcon && __("Close menu", "foodblog16-plus")}
              onClick={() => onToggle(false)}
            >
              {hasIcon && <Icon icon={close} />}
              {!hasIcon && __("Close", "foodblog16-plus")}
            </Button>
            <div
              className="wp-block-foodblog16-plus-custom-navigation__responsive-container-content"
              id={`${modalId}-content`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
