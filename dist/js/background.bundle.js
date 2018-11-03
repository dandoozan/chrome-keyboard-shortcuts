/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../_CommonChromeExtensions/background_listenForReload.js":
/*!****************************************************************!*\
  !*** ../_CommonChromeExtensions/background_listenForReload.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CRX_RELOADER_EXTENSION_ID = 'pcclhjignldjfdhkdmihngpdocikjhoa';\nconst RELOAD_MESSAGE = 'dpd_reloadExtension';\n\nconst BADGE_MESSAGE = 'RLD'; //for 'reloaded'\nconst BADGE_COLOR = '#4cb749'; //green\nconst BADGE_TIMEOUT_IN_MS = 1000;\n\n\nfunction showBadge(msgOf4CharsOrLess, colorAsCSSCompatibleString) {\n    chrome.browserAction.setBadgeText({text: msgOf4CharsOrLess});\n    chrome.browserAction.setBadgeBackgroundColor({color: colorAsCSSCompatibleString});\n}\n\nfunction removeBadge() {\n    //i guess just set the badge text to '' to remove it; i don't see anything in\n    //the documentation for how to remove a badge, and I can't think of any other way\n    //to do it\n    chrome.browserAction.setBadgeText({text: ''});\n}\n\nfunction flashBadge(msgOf4CharsOrLess, colorAsCSSCompatibleString, timeoutInMs) {\n    showBadge(msgOf4CharsOrLess, colorAsCSSCompatibleString);\n    setTimeout(removeBadge, timeoutInMs);\n}\n\nfunction handleOnInstalled() {\n    flashBadge(BADGE_MESSAGE, BADGE_COLOR, BADGE_TIMEOUT_IN_MS);\n}\n\nfunction reloadThisExtension() {\n    chrome.runtime.reload();\n}\n\nfunction handleOnMessageExternal(request, sender, sendResponse) {\n    if (sender.id === CRX_RELOADER_EXTENSION_ID) { //ensure the msg is coming from the CrxReloader extension\n        if (request.msg === RELOAD_MESSAGE) {\n            reloadThisExtension()\n        }\n    }\n}\n\nchrome.runtime.onInstalled.addListener(handleOnInstalled);\nchrome.runtime.onMessageExternal.addListener(handleOnMessageExternal);\n\n//# sourceURL=webpack:///../_CommonChromeExtensions/background_listenForReload.js?");

/***/ }),

/***/ "../_CommonChromeExtensions/background_utils.js":
/*!******************************************************!*\
  !*** ../_CommonChromeExtensions/background_utils.js ***!
  \******************************************************/
/*! exports provided: getCurrentTab, getAllTabs, getAllSelectedTabs, closeTab, closeTabs, createNewWindowWithTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCurrentTab\", function() { return getCurrentTab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAllTabs\", function() { return getAllTabs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAllSelectedTabs\", function() { return getAllSelectedTabs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeTab\", function() { return closeTab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeTabs\", function() { return closeTabs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createNewWindowWithTabs\", function() { return createNewWindowWithTabs; });\n\nfunction getCurrentTab(cb) {\n    chrome.tabs.query({\n        currentWindow: true,\n        active: true\n    }, function (tabs) {\n        cb(tabs[0]);\n    });\n}\nfunction getAllTabs(cb) {\n    chrome.tabs.query({\n        currentWindow: true\n    }, (tabs) => {\n        cb(tabs);\n    });\n}\nfunction getAllSelectedTabs(cb) {\n    chrome.tabs.query({\n        currentWindow: true,\n        highlighted: true\n    }, (tabs) => {\n        cb(tabs);\n    });\n}\nfunction closeTab(tab, cb) {\n    chrome.tabs.remove(tab.id, cb);\n}\nfunction closeTabs(tabs, cb) {\n    chrome.tabs.remove(tabs.map((tab) => tab.id), cb);\n}\nfunction createNewWindowWithTabs(tabs, cb) {\n    const tabUrls = tabs.map((tab) => tab.url);\n    chrome.windows.create({\n        url: tabUrls\n    }, cb);\n}\n\n//# sourceURL=webpack:///../_CommonChromeExtensions/background_utils.js?");

/***/ }),

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_CommonChromeExtensions/background_utils */ \"../_CommonChromeExtensions/background_utils.js\");\n/* harmony import */ var _CommonChromeExtensions_background_listenForReload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_CommonChromeExtensions/background_listenForReload */ \"../_CommonChromeExtensions/background_listenForReload.js\");\n/* harmony import */ var _CommonChromeExtensions_background_listenForReload__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CommonChromeExtensions_background_listenForReload__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst BACKGROUND_FUNCTIONS = {\n    closeTabsToTheRight() {\n        Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"getCurrentTab\"])((currentTab) => {\n            const currentTabIndex = currentTab.index;\n            Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"getAllTabs\"])((tabs) => {\n                tabs.forEach((tab, index) => {\n                    if (tab.index > currentTabIndex) {\n                        Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"closeTab\"])(tab);\n                    }\n                });\n            });\n        });\n    },\n    closeTabsToTheLeft() {\n        Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"getCurrentTab\"])((currentTab) => {\n            const currentTabIndex = currentTab.index;\n            Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"getAllTabs\"])((tabs) => {\n                tabs.forEach((tab) => {\n                    if (tab.index < currentTabIndex) {\n                        Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"closeTab\"])(tab);\n                    }\n                });\n            });\n        });\n    },\n\n    moveTabToNewWindow() {\n        Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"getAllSelectedTabs\"])((tabs) => {\n            const tabIds = tabs.map((tab) => tab.id);\n            Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"createNewWindow\"])((window) => {\n                chrome.tabs.move(tabIds, window.id);\n            });\n        });\n    },\n\n    moveTabLeft() {\n        Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"getCurrentTab\"])((tab) => {\n            chrome.tabs.move(tab.id, {\n                index: tab.index - 1\n            });\n        });\n    },\n    moveTabRight() {\n        Object(_CommonChromeExtensions_background_utils__WEBPACK_IMPORTED_MODULE_0__[\"getCurrentTab\"])((tab) => {\n            chrome.tabs.move(tab.id, {\n                index: tab.index + 1\n            });\n        });\n    }\n};\n\n\nchrome.runtime.onMessage.addListener((request, sender, sendResponse) => {\n    console.log('​request=', request);\n    if (request.action) {\n        BACKGROUND_FUNCTIONS[request.action](request.params);\n    }\n});\n\n//# sourceURL=webpack:///./src/js/background.js?");

/***/ })

/******/ });