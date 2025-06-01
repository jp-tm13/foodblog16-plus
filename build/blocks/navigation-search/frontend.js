/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
  !*** ./src/blocks/navigation-search/frontend.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_side_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../icons/side-menu */ "./src/icons/side-menu.js");


document.addEventListener("DOMContentLoaded", () => {
  // handle search form opening and closing
  const searchFormEl = document.querySelector(".fblgstp-search-button-container");
  const searchFormOverlay = document.querySelector(".fblgstp-search-button-overlay");
  const searchFormBtn = document.querySelectorAll(".fblgstp-search-button, .fblgstp-search-button-overlay");
  // attach event-listeners for opening/closing
  searchFormBtn.forEach(el => {
    el.addEventListener("click", event => {
      searchFormEl.classList.toggle("fblgstp-search-button-open");
      searchFormOverlay.classList.toggle("fblgstp-search-button-open");
    });
  });

  // // remove element from parent if click outside of element is registered
  // function hideOnClickOutside(element, parent) {
  //   const outsideClickListener = (event) => {
  //     if (!element.contains(event.target)) {
  //       parent.removeChild(element);
  //       removeClickListener();
  //     }
  //   };

  //   const removeClickListener = () => {
  //     document.removeEventListener("click", outsideClickListener);
  //   };

  //   document.addEventListener("click", outsideClickListener);
  // }

  // // add event-listener to search button for opening and closing the search-form
  // const searchBtn = document.querySelector(".fblgstp-search-button");
  // const headerEl = document.querySelector(".fblgstp-header-main");

  // searchBtn.addEventListener("click", (event) => {
  //   // add the search-form to header
  //   const searchFormEl = document.querySelector(".fblgstp-search-overlay");

  //   if (!searchFormEl) {
  //     const div = document.createElement("div");
  //     div.className = "fblgstp-search-overlay";
  //     div.innerHTML = `
  //       <form class="fblgstp-search-form">
  //         <input
  //           type="text"
  //           placeholder="${__("What are you looking for?", "foodblog16-plus")}"
  //           name="s"
  //           class="fblgstp-search-input"
  //         />
  //         <button type="submit" class="fblgstp-search-btn">
  //           ${__("Search", "foodblog16-plus")}
  //         </button>
  //       </form>
  //     `;

  //     headerEl.appendChild(div);
  //     event.stopPropagation();

  //     hideOnClickOutside(
  //       document.querySelector(".fblgstp-search-overlay"),
  //       headerEl
  //     );
  //   }
  // });
});
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map