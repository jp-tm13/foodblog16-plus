// wordpress dependencies
import { VisuallyHidden } from "@wordpress/components";

export default function AccessibleDescription({ id, children }) {
  return (
    <VisuallyHidden>
      <div
        id={id}
        className="wp-block-foodblog16-plus-custom-navigation__description"
      >
        {children}
      </div>
    </VisuallyHidden>
  );
}
