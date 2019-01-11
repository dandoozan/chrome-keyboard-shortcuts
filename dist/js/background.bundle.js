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

/***/ "../_CommonChromeExtensions/_listenForReload.js":
/*!******************************************************!*\
  !*** ../_CommonChromeExtensions/_listenForReload.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CRX_RELOADER_EXTENSION_ID = 'pcclhjignldjfdhkdmihngpdocikjhoa';\nconst RELOAD_MESSAGE = 'dpd_reloadExtension';\n\nconst BADGE_MESSAGE = 'RLD'; //for 'reloaded'\nconst BADGE_COLOR = '#4cb749'; //green\nconst BADGE_TIMEOUT_IN_MS = 1000;\n\nfunction showBadge(msgOf4CharsOrLess, colorAsCSSCompatibleString) {\n    chrome.browserAction.setBadgeText({text: msgOf4CharsOrLess});\n    chrome.browserAction.setBadgeBackgroundColor({color: colorAsCSSCompatibleString});\n}\n\nfunction removeBadge() {\n    //i guess just set the badge text to '' to remove it; i don't see anything in\n    //the documentation for how to remove a badge, and I can't think of any other way\n    //to do it\n    chrome.browserAction.setBadgeText({text: ''});\n}\n\nfunction flashBadge(msgOf4CharsOrLess, colorAsCSSCompatibleString, timeoutInMs) {\n    showBadge(msgOf4CharsOrLess, colorAsCSSCompatibleString);\n    setTimeout(removeBadge, timeoutInMs);\n}\n\nfunction handleOnInstalled() {\n    flashBadge(BADGE_MESSAGE, BADGE_COLOR, BADGE_TIMEOUT_IN_MS);\n}\n\nfunction reloadThisExtension() {\n    chrome.runtime.reload();\n}\n\nfunction handleOnMessageExternal(request, sender, sendResponse) {\n    if (sender.id === CRX_RELOADER_EXTENSION_ID) { //ensure the msg is coming from the CrxReloader extension\n        if (request.msg === RELOAD_MESSAGE) {\n            reloadThisExtension()\n        }\n    }\n}\n\nchrome.runtime.onInstalled.addListener(handleOnInstalled);\nchrome.runtime.onMessageExternal.addListener(handleOnMessageExternal);\n\n//# sourceURL=webpack:///../_CommonChromeExtensions/_listenForReload.js?");

/***/ }),

/***/ "../_CommonChromeExtensions/background.js":
/*!************************************************!*\
  !*** ../_CommonChromeExtensions/background.js ***!
  \************************************************/
/*! exports provided: listenForReload, isWindowFullscreen, getCurrentWindow, setFullscreenOff, getCurrentTab, getAllTabs, getAllSelectedTabs, closeTab, closeTabs, createTab, duplicateTab, createNewWindow, moveTabToNewWindow, moveTabToNewWindowOnTheRight, moveTabsToWindow, getScreenWidth, getScreenHeight, moveWindowToRightSide, moveWindowToLeftSide, getWindowsOnRightSideOfScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"listenForReload\", function() { return listenForReload; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isWindowFullscreen\", function() { return isWindowFullscreen; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCurrentWindow\", function() { return getCurrentWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setFullscreenOff\", function() { return setFullscreenOff; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCurrentTab\", function() { return getCurrentTab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAllTabs\", function() { return getAllTabs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAllSelectedTabs\", function() { return getAllSelectedTabs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeTab\", function() { return closeTab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeTabs\", function() { return closeTabs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTab\", function() { return createTab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"duplicateTab\", function() { return duplicateTab; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createNewWindow\", function() { return createNewWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabToNewWindow\", function() { return moveTabToNewWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabToNewWindowOnTheRight\", function() { return moveTabToNewWindowOnTheRight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabsToWindow\", function() { return moveTabsToWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getScreenWidth\", function() { return getScreenWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getScreenHeight\", function() { return getScreenHeight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveWindowToRightSide\", function() { return moveWindowToRightSide; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveWindowToLeftSide\", function() { return moveWindowToLeftSide; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getWindowsOnRightSideOfScreen\", function() { return getWindowsOnRightSideOfScreen; });\nfunction listenForReload() {\n    __webpack_require__(/*! ./_listenForReload */ \"../_CommonChromeExtensions/_listenForReload.js\");\n}\n\nfunction isWindowFullscreen(window) {\n    return window.state === 'fullscreen';\n}\n\nfunction getCurrentWindow() {\n    return new Promise((resolve, reject) => {\n        chrome.windows.getCurrent(null, resolve);\n    });\n}\nfunction setFullscreenOff(window) {\n    return new Promise((resolve, reject) => {\n        chrome.windows.update(window.id, { state: 'normal' }, resolve);\n    });\n}\nfunction getCurrentTab() {\n    return new Promise((resolve, reject) => {\n        chrome.tabs.query({ currentWindow: true, active: true }, function(\n            tabs\n        ) {\n            resolve(tabs[0]);\n        });\n    });\n}\nfunction getAllTabs() {\n    return new Promise((resolve, reject) => {\n        chrome.tabs.query({ currentWindow: true }, tabs => {\n            resolve(tabs);\n        });\n    });\n}\nfunction getAllSelectedTabs() {\n    return new Promise((resolve, reject) => {\n        chrome.tabs.query({ currentWindow: true, highlighted: true }, tabs => {\n            resolve(tabs);\n        });\n    });\n}\nasync function closeTab(tab) {\n    await closeTabs([tab]);\n}\nfunction closeTabs(tabs) {\n    return new Promise((resolve, reject) => {\n        chrome.tabs.remove(tabs.map(tab => tab.id), resolve);\n    });\n}\n\nfunction createTab(url) {\n    return new Promise((resolve, reject) => {\n        chrome.tabs.create({ url }, resolve);\n    });\n}\n\nfunction duplicateTab(tabId) {\n    return new Promise((resolve, reject) => {\n        chrome.tabs.duplicate(tabId, resolve);\n    })\n}\n\nfunction createNewWindow(windowOptions) {\n    return new Promise((resolve, reject) => {\n        chrome.windows.create(windowOptions, window => {\n            resolve(window);\n        });\n    });\n}\n\n//todo: move this to ChromeKeyboardShortcuts\nasync function moveTabToNewWindow(tab) {\n    return await createNewWindow({ tabId: tab.id });\n}\n//todo: move this to ChromeKeyboardShortcuts\nasync function moveTabToNewWindowOnTheRight(tab) {\n    return await createNewWindow({\n        tabId: tab.id,\n        left: (await getScreenWidth()) / 2,\n        top: 0,\n        width: (await getScreenWidth()) / 2,\n        height: await getScreenHeight(),\n    });\n}\n\nasync function focusTab(tab) {\n    return new Promise((resolve, reject) => {\n        chrome.tabs.update(tab.id, { active: true }, tab => resolve);\n    });\n}\n\nfunction moveTabsToWindow(tabs, window) {\n    return new Promise((resolve, reject) => {\n        const tabIds = tabs.map(tab => tab.id);\n        chrome.tabs.move(\n            tabIds,\n            { windowId: window.id, index: -1 },\n            async tabOrTabs => {\n                //focus the first tab (otherwise, they're unfocused)\n                await focusTab(\n                    Array.isArray(tabOrTabs) ? tabOrTabs[0] : tabOrTabs\n                );\n                resolve(tabOrTabs);\n            }\n        );\n    });\n}\n\nfunction getDisplayInfo() {\n    return new Promise((resolve, reject) => {\n        chrome.system.display.getInfo(displays => {\n            //displays is an array of displays, which presumably is for when a user\n            //has multiple monitors, but i dont so I'm just taking the first one\n            resolve(displays[0]);\n        });\n    });\n}\n\nasync function getScreenWidth() {\n    const displayInfo = await getDisplayInfo();\n\n    //use workArea since this is the area that excludes the menu bar at the\n    //of the screen\n    return displayInfo.workArea.width;\n}\nasync function getScreenHeight() {\n    const displayInfo = await getDisplayInfo();\n\n    //use workArea since this is the area that excludes the menu bar at the\n    //of the screen\n    return displayInfo.workArea.height;\n}\n\n//todo: move this to ChromeKeyboardShortcuts\nasync function moveWindowToRightSide(window) {\n    return new Promise(async (resolve, reject) => {\n        const options = {\n            left: (await getScreenWidth()) / 2,\n            top: 0,\n            width: (await getScreenWidth()) / 2,\n            height: await getScreenHeight(),\n        };\n        chrome.windows.update(window.id, options, resolve);\n    });\n}\n//todo: move this to ChromeKeyboardShortcuts\nasync function moveWindowToLeftSide(window) {\n    return new Promise(async (resolve, reject) => {\n        const options = {\n            left: 0,\n            top: 0,\n            width: (await getScreenWidth()) / 2,\n            height: await getScreenHeight(),\n        };\n        chrome.windows.update(window.id, options, resolve);\n    });\n}\n\nfunction getAllWindows() {\n    return new Promise((resolve, reject) => {\n        chrome.windows.getAll(\n            {\n                populate: true,\n                windowTypes: ['normal'],\n            },\n            resolve\n        );\n    });\n}\n\n//todo: move this to ChromeKeyboardShortcuts\nasync function isWindowHalfScreenSize(window) {\n    return (\n        window.width === (await getScreenWidth()) / 2 &&\n        window.height === (await getScreenHeight())\n    );\n}\n//todo: move this to ChromeKeyboardShortcuts\nasync function isWindowOnRightSideOfScreen(window) {\n    return (\n        (await isWindowHalfScreenSize(window)) &&\n        window.left === (await getScreenWidth()) / 2\n    );\n}\n\n//todo: move this to ChromeKeyboardShortcuts\nasync function getWindowsOnRightSideOfScreen() {\n    const windows = await getAllWindows();\n    const windowsOnRightSideOfScreen = [];\n    for (const window of windows) {\n        if (await isWindowOnRightSideOfScreen(window)) {\n            windowsOnRightSideOfScreen.push(window);\n        }\n    }\n    return windowsOnRightSideOfScreen;\n}\n\n\n//# sourceURL=webpack:///../_CommonChromeExtensions/background.js?");

/***/ }),

/***/ "../_CommonChromeExtensions/index.js":
/*!*******************************************!*\
  !*** ../_CommonChromeExtensions/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n    background: __webpack_require__(/*! ./background */ \"../_CommonChromeExtensions/background.js\")\n};\n\n\n//# sourceURL=webpack:///../_CommonChromeExtensions/index.js?");

/***/ }),

/***/ "./src/js/_actions.js":
/*!****************************!*\
  !*** ./src/js/_actions.js ***!
  \****************************/
/*! exports provided: closeTabsToTheRight, closeTabsToTheLeft, moveTabsToNewWindow, moveTabsToNewWindowOnTheRight, moveTabsToRightSide, moveTabLeft, moveTabRight, duplicateTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeTabsToTheRight\", function() { return closeTabsToTheRight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeTabsToTheLeft\", function() { return closeTabsToTheLeft; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabsToNewWindow\", function() { return moveTabsToNewWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabsToNewWindowOnTheRight\", function() { return moveTabsToNewWindowOnTheRight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabsToRightSide\", function() { return moveTabsToRightSide; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabLeft\", function() { return moveTabLeft; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveTabRight\", function() { return moveTabRight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"duplicateTabs\", function() { return duplicateTabs; });\n/* harmony import */ var _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_CommonChromeExtensions */ \"../_CommonChromeExtensions/index.js\");\n/* harmony import */ var _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__);\n\n\nasync function closeTabsToTheRight() {\n    const currentTab = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getCurrentTab();\n    const currentTabIndex = currentTab.index;\n    const tabs = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getAllTabs();\n    tabs.forEach(async (tab, index) => {\n        if (tab.index > currentTabIndex) {\n            await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].closeTab(tab);\n        }\n    });\n}\nasync function closeTabsToTheLeft() {\n    const currentTab = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getCurrentTab();\n    const currentTabIndex = currentTab.index;\n    const tabs = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getAllTabs();\n    tabs.forEach(async (tab) => {\n        if (tab.index < currentTabIndex) {\n            await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].closeTab(tab);\n        }\n    });\n}\n\nasync function moveTabsToNewWindow(tabs) {\n    //if no tabs are passed in, get the currently selected tabs\n    const [firstTab, ...restOfTabs] = tabs || await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getAllSelectedTabs();\n\n    //first, create the window from the first tab (bc you can't create a\n    //window with multiple tabs)\n    const window = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].moveTabToNewWindow(firstTab);\n\n    //then, move the rest of the tabs over to the new window\n    if (restOfTabs.length > 0) {\n        await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].moveTabsToWindow(restOfTabs, window);\n    }\n    return window;\n}\nasync function moveTabsToNewWindowOnTheRight(tabs) {\n    //if no tabs are passed in, get the currently selected tabs\n    const [firstTab, ...restOfTabs] = tabs || await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getAllSelectedTabs();\n\n    //first, create the window from the first tab (bc you can't create a\n    //window with multiple tabs)\n    const window = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].moveTabToNewWindowOnTheRight(firstTab);\n\n    //then, move the rest of the tabs over to the new window\n    if (restOfTabs.length > 0) {\n        await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].moveTabsToWindow(restOfTabs, window);\n    }\n    return window;\n}\n\nasync function splitFullscreenWindowToRight(window) {\n    await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].setFullscreenOff(window);\n    await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].moveWindowToLeftSide(window);\n\n    const selectedTabs = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getAllSelectedTabs();\n    await moveTabsToNewWindowOnTheRight(selectedTabs);\n}\n\nasync function moveTabsToRightSide() {\n    const currentWindow = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getCurrentWindow();\n\n    //if the current window is fullscreen, handle this special case by splitting\n    //it and moving the selected tabs to the right side\n    if (await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].isWindowFullscreen(currentWindow)) {\n        splitFullscreenWindowToRight(currentWindow);\n    } else {\n        const selectedTabs = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getAllSelectedTabs();\n\n        //if there is already a half-size window on the right side, move the\n        //selected tabs to that window\n        const windowsOnRightSide = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getWindowsOnRightSideOfScreen();\n        if (windowsOnRightSide.length > 0) {\n            //move the tabs to the first window on the right--this may not be\n            //what i want, but i think it will work for most cases.  If i run\n            //into an issue where this doesn't work, then try to come up with a\n            //way of knowing which window to move it to (maybe by most recent\n            //focused of something)\n            const firstWindowOnRightSide = windowsOnRightSide[0];\n            _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].moveTabsToWindow(selectedTabs, firstWindowOnRightSide);\n        } else { //otherwise, create a half-size window on the right and move the selected tabs there\n            await moveTabsToNewWindowOnTheRight(selectedTabs);\n        }\n    }\n}\n\nfunction moveTabLeft() {\n    return new Promise(async (resolve, reject) => {\n        const tab = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getCurrentTab();\n        chrome.tabs.move(tab.id, {\n            index: tab.index - 1\n        }, resolve);\n    });\n}\nfunction moveTabRight() {\n    return new Promise(async (resolve, reject) => {\n        const tab = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getCurrentTab();\n        chrome.tabs.move(tab.id, {\n            index: tab.index + 1\n        }, resolve);\n    });\n}\n\nasync function duplicateTabs() {\n    const tabs = await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].getAllSelectedTabs();\n    const tabIds = tabs.map((tab) => tab.id);\n\n    for (let i = 0; i < tabIds.length; i++) {\n        const tabId = tabIds[i];\n        await _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].duplicateTab(tabId);\n    }\n}\n\n//# sourceURL=webpack:///./src/js/_actions.js?");

/***/ }),

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_CommonChromeExtensions */ \"../_CommonChromeExtensions/index.js\");\n/* harmony import */ var _CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_actions */ \"./src/js/_actions.js\");\n\n\n\n//add the alt-r reload extension capability\n_CommonChromeExtensions__WEBPACK_IMPORTED_MODULE_0__[\"background\"].listenForReload();\n\n//listen for msgs from content scripts that will be sending a msg so that i run\n//an action from the background page context\nchrome.runtime.onMessage.addListener((request, sender, sendResponse) => {\n    if (request.fnName) {\n        _actions__WEBPACK_IMPORTED_MODULE_1__[request.fnName](request.params);\n    }\n});\n\n//# sourceURL=webpack:///./src/js/background.js?");

/***/ })

/******/ });