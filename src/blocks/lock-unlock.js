// wordpress dependencies
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from "@wordpress/private-apis";

// dangerous and should be replaced at some point, because it might break with updates
export const { lock, unlock } =
  __dangerousOptInToUnstableAPIsOnlyForCoreModules(
    "I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.",
    "@wordpress/block-library"
  );
