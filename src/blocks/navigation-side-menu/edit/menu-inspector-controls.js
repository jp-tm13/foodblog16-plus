// wordpress dependencies
import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalHStack as HStack,
  __experimentalHeading as Heading,
  Spinner,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

// internal dependencies
import NavigationMenuSelector from "./navigation-menu-selector";
import useNavigationMenu from "./use-navigation-menu";

// constants
const actionLabel = __("Switch to '%s'", "foodblog16-plus");

// render current navigation title
const MainContent = ({ currentMenuId, isLoading }) => {
  const { navigationMenu } = useNavigationMenu(currentMenuId);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>{navigationMenu?.title || __("Untitled menu", "foodblog16-plus")}</div>
  );
};

// actual components
const MenuInspectorControls = (props) => {
  const {
    currentMenuId = null,
    onSelectNavigationMenu,
    isManageMenusButtonDisabled,
    blockEditingMode,
  } = props;

  return (
    <InspectorControls>
      <PanelBody title={null}>
        <HStack className="fblgstp-menu-inspector-header">
          <Heading className="fblgstp-menu-inspector-title" level={2}>
            {__("Menu", "foodblog16-plus")}
          </Heading>
          {blockEditingMode === "default" && (
            <NavigationMenuSelector
              currentMenuId={currentMenuId}
              onSelectNavigationMenu={onSelectNavigationMenu}
              actionLabel={actionLabel}
              isManageMenusButtonDisabled={isManageMenusButtonDisabled}
            />
          )}
        </HStack>
        <MainContent {...props} />
      </PanelBody>
    </InspectorControls>
  );
};

export default MenuInspectorControls;
