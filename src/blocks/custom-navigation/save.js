// wordpress dependencies
import { InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  if (attributes.ref) {
    // load from navigation entity rather than hard-coded html
    return;
  }

  return <InnerBlocks.Content />;
}
