// wordpress dependencies
import { useEntityProp } from "@wordpress/core-data";
import { __, sprintf } from "@wordpress/i18n";

// internal dependencies
import AccessibleDescription from "./accessible-description";

export default function AccessibleMenuDescription({ id }) {
  const [menuTitle] = useEntityProp("postType", "wp_navigation", "title");
  const description = sprintf(
    __(`Navigation Menu: "%s"`, "foodblog16-plus"),
    menuTitle
  );

  return <AccessibleDescription id={id}>{description}</AccessibleDescription>;
}
