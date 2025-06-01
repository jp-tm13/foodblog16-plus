/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/more-vertical.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const moreVertical = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moreVertical);
//# sourceMappingURL=more-vertical.js.map

/***/ }),

/***/ "./src/blocks/lock-unlock.js":
/*!***********************************!*\
  !*** ./src/blocks/lock-unlock.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lock: () => (/* binding */ lock),
/* harmony export */   unlock: () => (/* binding */ unlock)
/* harmony export */ });
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/private-apis */ "@wordpress/private-apis");
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__);
// wordpress dependencies


// dangerous and should be replaced at some point, because it might break with updates
const {
  lock,
  unlock
} = (0,_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__.__dangerousOptInToUnstableAPIsOnlyForCoreModules)("I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.", "@wordpress/block-library");

/***/ }),

/***/ "./src/blocks/navigation-side-menu/block.json":
/*!****************************************************!*\
  !*** ./src/blocks/navigation-side-menu/block.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"foodblog16-plus/navigation-side-menu","title":"Navigation Side Menu","category":"widgets","description":"Adds a block that opens a side menu.","keywords":["menu","navigation","links"],"version":"1.0.0","textdomain":"foodblog16-plus","editorScript":"file:./index.js","viewScript":"file:./frontend.js","style":"file:./index.css","attributes":{"ref":{"type":"number"}}}');

/***/ }),

/***/ "./src/blocks/navigation-side-menu/edit/menu-inspector-controls.js":
/*!*************************************************************************!*\
  !*** ./src/blocks/navigation-side-menu/edit/menu-inspector-controls.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _navigation_menu_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigation-menu-selector */ "./src/blocks/navigation-side-menu/edit/navigation-menu-selector.js");
/* harmony import */ var _use_navigation_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-navigation-menu */ "./src/blocks/navigation-side-menu/edit/use-navigation-menu.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
// wordpress dependencies




// internal dependencies



// constants

const actionLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Switch to '%s'", "foodblog16-plus");

// render current navigation title
const MainContent = ({
  currentMenuId,
  isLoading
}) => {
  const {
    navigationMenu
  } = (0,_use_navigation_menu__WEBPACK_IMPORTED_MODULE_4__["default"])(currentMenuId);
  if (isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {});
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    children: navigationMenu?.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Untitled menu", "foodblog16-plus")
  });
};

// actual components
const MenuInspectorControls = props => {
  const {
    currentMenuId = null,
    onSelectNavigationMenu,
    isManageMenusButtonDisabled,
    blockEditingMode
  } = props;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: null,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
        className: "fblgstp-menu-inspector-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
          className: "fblgstp-menu-inspector-title",
          level: 2,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Menu", "foodblog16-plus")
        }), blockEditingMode === "default" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_navigation_menu_selector__WEBPACK_IMPORTED_MODULE_3__["default"], {
          currentMenuId: currentMenuId,
          onSelectNavigationMenu: onSelectNavigationMenu,
          actionLabel: actionLabel,
          isManageMenusButtonDisabled: isManageMenusButtonDisabled
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(MainContent, {
        ...props
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuInspectorControls);

/***/ }),

/***/ "./src/blocks/navigation-side-menu/edit/navigation-menu-selector.js":
/*!**************************************************************************!*\
  !*** ./src/blocks/navigation-side-menu/edit/navigation-menu-selector.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _use_navigation_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-navigation-menu */ "./src/blocks/navigation-side-menu/edit/use-navigation-menu.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
// wordpress dependencies







// internal dependencies


// construct the current menu label

function buildMenuLabel(title, id, status) {
  if (!title) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("(no title %s)", "foodblog16-plus"), id);
  }
  if (status === "publish") {
    return (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntities)(title);
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("%1$s (%2$s)", "foodblog16-plus"), (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_2__.decodeEntities)(title), status);
}

// actual selector component
function NavigationMenuSelector({
  currentMenuId,
  onSelectNavigationMenu,
  actionLabel
}) {
  const createActionLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Create from '%s'", "foodblog16-plus");
  const [isUpdatingMenuRef, setIsUpdatingMenuRef] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  actionLabel = actionLabel || createActionLabel;
  const {
    navigationMenus,
    isResolvingNavigationMenus,
    hasResolvedNavigationMenus,
    canUserCreateNavigationMenus,
    canSwitchNavigationMenu,
    isNavigationMenuMissing
  } = (0,_use_navigation_menu__WEBPACK_IMPORTED_MODULE_5__["default"])(currentMenuId);
  const [currentTitle] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.useEntityProp)("postType", "wp_navigation", "title");
  const menuChoices = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return navigationMenus?.map(({
      id,
      title,
      status
    }, index) => {
      const label = buildMenuLabel(title?.rendered, index + 1, status);
      return {
        value: id,
        label,
        ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(actionLabel, label),
        disabled: isUpdatingMenuRef || isResolvingNavigationMenus || !hasResolvedNavigationMenus
      };
    }) || [];
  }, [navigationMenus, actionLabel, isResolvingNavigationMenus, hasResolvedNavigationMenus, isUpdatingMenuRef]);
  const hasNavigationMenus = !!navigationMenus?.length;
  const showNavigationMenus = !!canSwitchNavigationMenu;
  const noMenuSelected = hasNavigationMenus && !currentMenuId;
  const noBlockMenus = !hasNavigationMenus && hasResolvedNavigationMenus;
  const menuUnavailable = hasResolvedNavigationMenus && currentMenuId === null;
  const navMenuHasBeenDeleted = currentMenuId && isNavigationMenuMissing;
  let selectorLabel = "";
  if (isResolvingNavigationMenus) {
    selectorLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Loading…", "foodblog16-plus");
  } else if (noMenuSelected || noBlockMenus || menuUnavailable || navMenuHasBeenDeleted) {
    selectorLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Choose a Navigation Menu", "foodblog16-plus");
  } else {
    // Current Menu's title.
    selectorLabel = currentTitle;
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (isUpdatingMenuRef) {
      setIsUpdatingMenuRef(false);
    }
  }, [hasResolvedNavigationMenus, canUserCreateNavigationMenus, isUpdatingMenuRef, menuUnavailable, noBlockMenus, noMenuSelected]);
  const NavigationMenuSelectorDropdown = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.DropdownMenu, {
    label: selectorLabel,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    toggleProps: {
      size: "small"
    },
    children: ({
      onClose
    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: showNavigationMenus && hasNavigationMenus && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.MenuGroup, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Menus", "foodblog16-plus"),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.MenuItemsChoice, {
          value: currentMenuId,
          onSelect: menuId => {
            onSelectNavigationMenu(menuId);
            onClose();
          },
          choices: menuChoices
        })
      })
    })
  });
  return NavigationMenuSelectorDropdown;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavigationMenuSelector);

/***/ }),

/***/ "./src/blocks/navigation-side-menu/edit/use-navigation-menu.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/navigation-side-menu/edit/use-navigation-menu.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useNavigationMenu)
/* harmony export */ });
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
// wordpress dependencies



// constants
const PRELOADED_NAVIGATION_MENUS_QUERY = {
  per_page: 100,
  status: ["publish", "draft"],
  order: "desc",
  orderby: "date"
};
function useNavigationMenu(ref) {
  const permissions = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.useResourcePermissions)({
    kind: "postType",
    name: "wp_navigation",
    id: ref
  });
  const {
    navigationMenu,
    isNavigationMenuResolved,
    isNavigationMenuMissing
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return selectExistingMenu(select, ref);
  }, [ref]);
  const {
    // check if user can create navigation menus
    canCreate: canCreateNavigationMenus,
    // check if user can update the specific menu with given post ID
    canUpdate: canUpdateNavigationMenu,
    // check if user can delete the specific menu with given post ID
    canDelete: canDeleteNavigationMenu,
    isResolving: isResolvingPermissions,
    hasResolved: hasResolvedPermissions
  } = permissions;
  const {
    records: navigationMenus,
    isResolving: isResolvingNavigationMenus,
    hasResolved: hasResolvedNavigationMenus
  } = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.useEntityRecords)("postType", `wp_navigation`, PRELOADED_NAVIGATION_MENUS_QUERY);
  const canSwitchNavigationMenu = ref ? navigationMenus?.length > 1 : navigationMenus?.length > 0;
  return {
    navigationMenu,
    isNavigationMenuResolved,
    isNavigationMenuMissing,
    navigationMenus,
    isResolvingNavigationMenus,
    hasResolvedNavigationMenus,
    canSwitchNavigationMenu,
    canUserCreateNavigationMenus: canCreateNavigationMenus,
    isResolvingCanUserCreateNavigationMenus: isResolvingPermissions,
    hasResolvedCanUserCreateNavigationMenus: hasResolvedPermissions,
    canUserUpdateNavigationMenu: canUpdateNavigationMenu,
    hasResolvedCanUserUpdateNavigationMenu: ref ? hasResolvedPermissions : undefined,
    canUserDeleteNavigationMenu: canDeleteNavigationMenu,
    hasResolvedCanUserDeleteNavigationMenu: ref ? hasResolvedPermissions : undefined
  };
}
function selectExistingMenu(select, ref) {
  if (!ref) {
    return {
      isNavigationMenuResolved: false,
      isNavigationMenuMissing: true
    };
  }
  const {
    getEntityRecord,
    getEditedEntityRecord,
    hasFinishedResolution
  } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_0__.store);
  const args = ["postType", "wp_navigation", ref];
  const navigationMenu = getEntityRecord(...args);
  const editedNavigationMenu = getEditedEntityRecord(...args);
  const hasResolvedNavigationMenu = hasFinishedResolution("getEditedEntityRecord", args);

  // only published Navigation posts are considered valid; drafts need to be
  // published to show on the front end
  const isNavigationMenuPublishedOrDraft = editedNavigationMenu.status === "publish" || editedNavigationMenu.status === "draft";
  return {
    isNavigationMenuResolved: hasResolvedNavigationMenu,
    isNavigationMenuMissing: hasResolvedNavigationMenu && (!navigationMenu || !isNavigationMenuPublishedOrDraft),
    // getEditedEntityRecord will return the post regardless of status; if not
    // published it should be ignored
    navigationMenu: isNavigationMenuPublishedOrDraft ? editedNavigationMenu : null
  };
}

/***/ }),

/***/ "./src/blocks/navigation-side-menu/main.css":
/*!**************************************************!*\
  !*** ./src/blocks/navigation-side-menu/main.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/icons/side-menu.js":
/*!********************************!*\
  !*** ./src/icons/side-menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const sideMenu = {};
sideMenu.primary = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-list",
  viewBox: "0 0 16 16",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    "fill-rule": "evenodd",
    d: "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sideMenu);

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/html-entities":
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
/***/ ((module) => {

module.exports = window["wp"]["htmlEntities"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/private-apis":
/*!*************************************!*\
  !*** external ["wp","privateApis"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["privateApis"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./src/blocks/navigation-side-menu/index.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _edit_use_navigation_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit/use-navigation-menu */ "./src/blocks/navigation-side-menu/edit/use-navigation-menu.js");
/* harmony import */ var _edit_menu_inspector_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./edit/menu-inspector-controls */ "./src/blocks/navigation-side-menu/edit/menu-inspector-controls.js");
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lock-unlock */ "./src/blocks/lock-unlock.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./block.json */ "./src/blocks/navigation-side-menu/block.json");
/* harmony import */ var _icons_side_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../icons/side-menu */ "./src/icons/side-menu.js");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./main.css */ "./src/blocks/navigation-side-menu/main.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);
// wordpress dependencies







// internal dependencies







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_9__.name, {
  icon: _icons_side_menu__WEBPACK_IMPORTED_MODULE_10__["default"].primary,
  edit({
    attributes,
    setAttributes,
    clientId
  }) {
    // get menu reference and define reference-setter
    const ref = attributes.ref;
    const setRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(postId => {
      setAttributes({
        ref: postId
      });
    }, [setAttributes]);

    // block editing
    const blockEditingMode = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockEditingMode)();

    // get checks etc. for selecting/using a given menu
    const {
      hasResolvedNavigationMenus,
      isNavigationMenuResolved,
      isNavigationMenuMissing,
      canUserUpdateNavigationMenu,
      canUserCreateNavigationMenus
    } = (0,_edit_use_navigation_menu__WEBPACK_IMPORTED_MODULE_6__["default"])(ref);

    // define constant for checking if a navigation entity is available
    const isEntityAvailable = !isNavigationMenuMissing && isNavigationMenuResolved;

    // define user permissions for managing menus
    const hasManagePermissions = canUserCreateNavigationMenus || canUserUpdateNavigationMenu;
    const isManageMenusButtonDisabled = !hasManagePermissions || !hasResolvedNavigationMenus;

    // "loading" state:
    // - there is a menu creation process in progress
    // OR:
    // - there is a ref attribute pointing to a Navigation Post
    // - the Navigation Post isn't available (hasn't resolved) yet
    const isLoading = !hasResolvedNavigationMenus || !!(ref && !isEntityAvailable);

    // callback for updating the current menu to a new menu
    const handleUpdateMenu = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(menuId => {
      setRef(menuId);
    }, [setRef]);

    // handle selecting a menu in menu-selector
    const onSelectNavigationMenu = menuId => {
      handleUpdateMenu(menuId);
    };

    // handle fallback
    //  request fallback-ID
    const {
      getNavigationFallbackId
    } = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_8__.unlock)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.store));
    const navigationFallbackId = !ref ? getNavigationFallbackId() : null;
    //  set ref to fallback if neccessary
    const {
      __unstableMarkNextChangeAsNotPersistent
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.store);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
      if (ref || !navigationFallbackId) {
        return;
      }
      __unstableMarkNextChangeAsNotPersistent();
      setRef(navigationFallbackId);
    }, [ref, setRef, navigationFallbackId, __unstableMarkNextChangeAsNotPersistent]);

    // render block
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_edit_menu_inspector_controls__WEBPACK_IMPORTED_MODULE_7__["default"], {
        clientId: clientId,
        currentMenuId: ref,
        isNavigationMenuMissing: isNavigationMenuMissing,
        isManageMenusButtonDisabled: isManageMenusButtonDisabled,
        onSelectNavigationMenu: onSelectNavigationMenu,
        isLoading: isLoading,
        blockEditingMode: blockEditingMode
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("button", {
        className: "fblgstp-side-menu-button",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
          class: "bi bi-list"
        })
      })]
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map