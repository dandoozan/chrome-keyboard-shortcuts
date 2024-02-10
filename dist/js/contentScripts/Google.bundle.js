var PAGE_MODULE =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/contentScripts/Google.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/contentScripts/Google.js":
/*!*************************************!*\
  !*** ./js/contentScripts/Google.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Google; });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Page */ "./js/contentScripts/_Page.js");


class Google extends _Page__WEBPACK_IMPORTED_MODULE_0__["Page"] {
  static openAllLinks() {
    console.log(`***openAllLinks`);
    // document.querySelectorAll('g-scrolling-carousel a').forEach(el => {
    //     window.open(el.href);
    // });
  }
  static async searchOnYoutube() {
    let searchTerm = new URL(window.location.href).searchParams.get('q');
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchTerm
      )}`
    );
  }
}


/***/ }),

/***/ "./js/contentScripts/_Page.js":
/*!************************************!*\
  !*** ./js/contentScripts/_Page.js ***!
  \************************************/
/*! exports provided: Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return Page; });
/* harmony import */ var _helpers_chrome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/chrome */ "./js/helpers/chrome.js");


class Page {
  //put common code for all page scripts here
  static focusSearchBar() {
    let selectors = [
      //generics
      'input#search',
      'input[title="Search"]',
      'input[type="Search"]',
      'input[placeholder="Search"]',

      'input#twotabsearchtextbox', //amazon
      'input#global-search-input', //walmart
      'input#search-input', //harbor freight
    ];

    let searchInput;
    for (let i = 0; i < selectors.length; i++) {
      searchInput = document.querySelector(selectors[i]);
      if (searchInput) {
        break;
      }
    }
    if (searchInput) {
      searchInput.focus();
    }
  }

  static async searchOnYoutube() {
    let searchTerm = await Object(_helpers_chrome__WEBPACK_IMPORTED_MODULE_0__["sendMessageToBackground"])('getClipboardContents');
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchTerm
      )}`
    );
  }

  static async searchOnBrave() {
    let searchTerm = await Object(_helpers_chrome__WEBPACK_IMPORTED_MODULE_0__["sendMessageToBackground"])('getClipboardContents');
    window.open(
      `https://search.brave.com/search?q=${encodeURIComponent(searchTerm)}`
    );
  }
}


/***/ }),

/***/ "./js/helpers/chrome.js":
/*!******************************!*\
  !*** ./js/helpers/chrome.js ***!
  \******************************/
/*! exports provided: clearStorage, getAllSelectedTabs, getAllTabs, getAllWindows, getContentScriptObject, getCurrentTab, getCurrentWindow, getExtensionId, getManifest, getScreenHeight, getScreenWidth, isWindowFullscreen, loadOptions, onMessage, readFromStorage, sendMessageToBackground, sendMessageToCurrentTab, writeToStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearStorage", function() { return clearStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllSelectedTabs", function() { return getAllSelectedTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllTabs", function() { return getAllTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllWindows", function() { return getAllWindows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContentScriptObject", function() { return getContentScriptObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTab", function() { return getCurrentTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentWindow", function() { return getCurrentWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtensionId", function() { return getExtensionId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManifest", function() { return getManifest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreenHeight", function() { return getScreenHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreenWidth", function() { return getScreenWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindowFullscreen", function() { return isWindowFullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOptions", function() { return loadOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMessage", function() { return onMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFromStorage", function() { return readFromStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMessageToBackground", function() { return sendMessageToBackground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMessageToCurrentTab", function() { return sendMessageToCurrentTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeToStorage", function() { return writeToStorage; });
function getManifest() {
  return chrome.runtime.getManifest();
}

async function loadOptions() {
  //first try to get options from options.json
  try {
    return __webpack_require__(/*! ../../options.json */ "./options.json");
  } catch (error) {
    //otherwise, get the options from storage
    return await readFromStorage({ options: {} });
  }
}

function readFromStorage(whatToGet) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(whatToGet, resolve);
  });
}

function clearStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.clear(resolve);
  });
}

function writeToStorage(whatToSet) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(whatToSet, resolve);
  });
}

function onMessage(msg, callback) {
  chrome.runtime.onMessage.addListener(function (
    { message, data },
    sender,
    sendResponse
  ) {
    if (message === msg) {
      sendResponse(callback(data, sender));
    } else {
      sendResponse(null);
    }

    return true; //<-- return true to let the message sender know that I'm definitely going to be calling sendResponse (otherwise, it will timeout)
  });
}

async function sendMessageToCurrentTab(message, data) {
  return new Promise(async function (resolve) {
    let { id } = await getCurrentTab();
    chrome.tabs.sendMessage(id, { message, data }, resolve);
  });
}

async function sendMessageToBackground(message, data) {
  return new Promise(async function (resolve) {
    chrome.runtime.sendMessage({ message, data }, resolve);
  });
}

async function getContentScriptObject(url, contentScripts) {
  //this function gets the "matches" object for the given url (ie. the
  //object that looks like:
  //{
  //     "matches": ["https://www.google.com/*"],
  //     "exclude_matches": ["https://www.google.com/search?*"],
  //     "js": [
  //         "js/contentScripts/google.bundle.js",
  //         "js/contenScripts/_main.js"
  //     ],
  //     "my_custom_property": "value"
  //}

  function isMatch(url, urlGlobs) {
    if (url && urlGlobs) {
      for (let urlGlob of urlGlobs) {
        if (
          url === urlGlob ||
          urlGlob === '<all_urls>' ||
          convertMatchPatternToRegExp(urlGlob).test(url)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  //if contenScripts has been passed in, get it from there
  if (contentScripts) {
    for (let contentScriptObj of contentScripts) {
      let { matches, exclude_matches } = contentScriptObj;
      //if the url matches one of the urls in "matches" and
      //does NOT match one of the urls in "exclude_matches", return this obj
      if (isMatch(url, matches) && !isMatch(url, exclude_matches)) {
        return contentScriptObj;
      }
    }
  } else {
    //otherwise, first try to get it from manifest.json
    let contentScriptObj = await getContentScriptObject(
      url,
      getManifest().content_scripts || []
    );
    if (contentScriptObj) {
      return contentScriptObj;
    }

    //if that doesn't work, then try to get it from options
    return await getContentScriptObject(
      url,
      (await loadOptions()).content_scripts || []
    );
  }
}

function getExtensionId() {
  return chrome.runtime.id;
}

function isWindowFullscreen(window) {
  return window.state === 'fullscreen';
}

function getCurrentWindow() {
  return new Promise((resolve, reject) => {
    chrome.windows.getCurrent(null, resolve);
  });
}

function getAllWindows() {
  return new Promise((resolve, reject) => {
    chrome.windows.getAll(
      {
        populate: true,
        windowTypes: ['normal'],
      },
      resolve
    );
  });
}

function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      resolve(tabs[0]);
    });
  });
}
function getAllTabs() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true }, tabs => {
      resolve(tabs);
    });
  });
}
function getAllSelectedTabs() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, highlighted: true }, tabs => {
      resolve(tabs);
    });
  });
}

function getDisplayInfo() {
  return new Promise((resolve, reject) => {
    chrome.system.display.getInfo(displays => {
      resolve(displays[0]);
    });
  });
}

async function getScreenWidth() {
  const displayInfo = await getDisplayInfo();

  //use workArea since that excludes the menu bar at the top of the screen
  return displayInfo.workArea.width;
}
async function getScreenHeight() {
  const displayInfo = await getDisplayInfo();

  //use workArea since that excludes the menu bar at the top of the screen
  return displayInfo.workArea.height;
}

/*The below is from: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns
/**
 * Transforms a valid match pattern into a regular expression
 * which matches all URLs included by that pattern.
 *
 * @param  {string}  pattern  The pattern to transform.
 * @return {RegExp}           The pattern's equivalent as a RegExp.
 * @throws {TypeError}        If the pattern is not a valid MatchPattern
 */
function convertMatchPatternToRegExp(pattern) {
  if (pattern === '') {
    return /^(?:http|https|file|ftp|app):\/\//;
  }

  const schemeSegment = '(\\*|http|https|file|ftp)';
  const hostSegment = '(\\*|(?:\\*\\.)?(?:[^/*]+))?';
  const pathSegment = '(.*)';
  const matchPatternRegExp = new RegExp(
    `^${schemeSegment}://${hostSegment}/${pathSegment}$`
  );

  let match = matchPatternRegExp.exec(pattern);
  if (!match) {
    throw new TypeError(`"${pattern}" is not a valid MatchPattern`);
  }

  let [, scheme, host, path] = match;
  if (!host) {
    throw new TypeError(`"${pattern}" does not have a valid host`);
  }

  let regex = '^';

  if (scheme === '*') {
    regex += '(http|https)';
  } else {
    regex += scheme;
  }

  regex += '://';

  if (host && host === '*') {
    regex += '[^/]+?';
  } else if (host) {
    if (host.match(/^\*\./)) {
      regex += '[^/]*?';
      host = host.substring(2);
    }
    regex += host.replace(/\./g, '\\.');
  }

  if (path) {
    if (path === '*') {
      regex += '(/.*)?';
    } else if (path.charAt(0) !== '/') {
      regex += '/';
      regex += path
        .replace(/\./g, '\\.')
        .replace(/\?/g, '\\?')
        .replace(/\*/g, '.*?');
      regex += '/?';
    }
  }

  regex += '$';
  return new RegExp(regex);
}




/***/ }),

/***/ "./options.json":
/*!**********************!*\
  !*** ./options.json ***!
  \**********************/
/*! exports provided: reload_extension_message, keyboard_shortcuts, default */
/***/ (function(module) {

module.exports = {"reload_extension_message":"reloadExtension","keyboard_shortcuts":[{"keyCombo":"`","fnName":"moveTabLeft"},{"keyCombo":"1","fnName":"moveTabRight"},{"keyCombo":"2","fnName":"moveTabsToRightSide"},{"keyCombo":"3","fnName":"moveTabsToLeftSide"},{"keyCombo":"4","fnName":"closeTabsToTheRight"},{"keyCombo":"6","fnName":"closeTabsToTheLeft"},{"keyCombo":"7","fnName":"moveTabsToNewWindow"},{"keyCombo":"8","fnName":"duplicateTabs"},{"keyCombo":"9","fnName":"reloadExtension","args":["Xtract"]},{"keyCombo":"0","fnName":"reloadExtension","args":["me"]},{"keyCombo":"-","fnName":"createTab","args":["https://docs.google.com/spreadsheets/u/0/"]},{"keyCombo":"=","fnName":"createTab","args":["https://docs.google.com/document/u/0/"]},{"keyCombo":"q","fnName":"createTab","args":["https://www.wikipedia.org/"]},{"keyCombo":"w","fnName":"createTab","args":["https://mail.google.com/mail/u/0/"]},{"keyCombo":"e","fnName":"createTab","args":["https://www.google.com/maps"]},{"keyCombo":"r","fnName":"createTab","args":["https://www.youtube.com/"]},{"keyCombo":"y","fnName":"reloadExtension","args":["CopySelection"]},{"keyCombo":"u","fnName":"reloadExtension","args":["PageTitleChanger"]},{"keyCombo":"i","fnName":"moveTabToNthPosition","args":[1]},{"keyCombo":"o","fnName":"reloadExtension","args":["RemoveSticky"]},{"keyCombo":"p","fnName":"moveTabToNthPosition","args":[2]},{"keyCombo":"[","fnName":"moveTabToNthPosition","args":[3]},{"keyCombo":"]","fnName":"moveTabToNthPosition","args":[4]},{"keyCombo":"\\","fnName":"moveTabToNthPosition","args":[5]},{"keyCombo":"a","fnName":"reloadExtension","args":["DraftKings"]}]};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QQUdFX01PRFVMRS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QQUdFX01PRFVMRS8uL2pzL2NvbnRlbnRTY3JpcHRzL0dvb2dsZS5qcyIsIndlYnBhY2s6Ly9QQUdFX01PRFVMRS8uL2pzL2NvbnRlbnRTY3JpcHRzL19QYWdlLmpzIiwid2VicGFjazovL1BBR0VfTU9EVUxFLy4vanMvaGVscGVycy9jaHJvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQStCOztBQUVoQixxQkFBcUIsMENBQUk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakJBO0FBQUE7QUFBQTtB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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUU2VCIsImZpbGUiOiIvanMvY29udGVudFNjcmlwdHMvR29vZ2xlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vanMvY29udGVudFNjcmlwdHMvR29vZ2xlLmpzXCIpO1xuIiwiaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vX1BhZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb29nbGUgZXh0ZW5kcyBQYWdlIHtcbiAgc3RhdGljIG9wZW5BbGxMaW5rcygpIHtcbiAgICBjb25zb2xlLmxvZyhgKioqb3BlbkFsbExpbmtzYCk7XG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZy1zY3JvbGxpbmctY2Fyb3VzZWwgYScpLmZvckVhY2goZWwgPT4ge1xuICAgIC8vICAgICB3aW5kb3cub3BlbihlbC5ocmVmKTtcbiAgICAvLyB9KTtcbiAgfVxuICBzdGF0aWMgYXN5bmMgc2VhcmNoT25Zb3V0dWJlKCkge1xuICAgIGxldCBzZWFyY2hUZXJtID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuc2VhcmNoUGFyYW1zLmdldCgncScpO1xuICAgIHdpbmRvdy5vcGVuKFxuICAgICAgYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3Jlc3VsdHM/c2VhcmNoX3F1ZXJ5PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBzZWFyY2hUZXJtXG4gICAgICApfWBcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBzZW5kTWVzc2FnZVRvQmFja2dyb3VuZCB9IGZyb20gJy4uL2hlbHBlcnMvY2hyb21lJztcblxuZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICAvL3B1dCBjb21tb24gY29kZSBmb3IgYWxsIHBhZ2Ugc2NyaXB0cyBoZXJlXG4gIHN0YXRpYyBmb2N1c1NlYXJjaEJhcigpIHtcbiAgICBsZXQgc2VsZWN0b3JzID0gW1xuICAgICAgLy9nZW5lcmljc1xuICAgICAgJ2lucHV0I3NlYXJjaCcsXG4gICAgICAnaW5wdXRbdGl0bGU9XCJTZWFyY2hcIl0nLFxuICAgICAgJ2lucHV0W3R5cGU9XCJTZWFyY2hcIl0nLFxuICAgICAgJ2lucHV0W3BsYWNlaG9sZGVyPVwiU2VhcmNoXCJdJyxcblxuICAgICAgJ2lucHV0I3R3b3RhYnNlYXJjaHRleHRib3gnLCAvL2FtYXpvblxuICAgICAgJ2lucHV0I2dsb2JhbC1zZWFyY2gtaW5wdXQnLCAvL3dhbG1hcnRcbiAgICAgICdpbnB1dCNzZWFyY2gtaW5wdXQnLCAvL2hhcmJvciBmcmVpZ2h0XG4gICAgXTtcblxuICAgIGxldCBzZWFyY2hJbnB1dDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yc1tpXSk7XG4gICAgICBpZiAoc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWFyY2hJbnB1dCkge1xuICAgICAgc2VhcmNoSW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgc2VhcmNoT25Zb3V0dWJlKCkge1xuICAgIGxldCBzZWFyY2hUZXJtID0gYXdhaXQgc2VuZE1lc3NhZ2VUb0JhY2tncm91bmQoJ2dldENsaXBib2FyZENvbnRlbnRzJyk7XG4gICAgd2luZG93Lm9wZW4oXG4gICAgICBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vcmVzdWx0cz9zZWFyY2hfcXVlcnk9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIHNlYXJjaFRlcm1cbiAgICAgICl9YFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgc2VhcmNoT25CcmF2ZSgpIHtcbiAgICBsZXQgc2VhcmNoVGVybSA9IGF3YWl0IHNlbmRNZXNzYWdlVG9CYWNrZ3JvdW5kKCdnZXRDbGlwYm9hcmRDb250ZW50cycpO1xuICAgIHdpbmRvdy5vcGVuKFxuICAgICAgYGh0dHBzOi8vc2VhcmNoLmJyYXZlLmNvbS9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKX1gXG4gICAgKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gZ2V0TWFuaWZlc3QoKSB7XG4gIHJldHVybiBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkT3B0aW9ucygpIHtcbiAgLy9maXJzdCB0cnkgdG8gZ2V0IG9wdGlvbnMgZnJvbSBvcHRpb25zLmpzb25cbiAgdHJ5IHtcbiAgICByZXR1cm4gcmVxdWlyZSgnLi4vLi4vb3B0aW9ucy5qc29uJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy9vdGhlcndpc2UsIGdldCB0aGUgb3B0aW9ucyBmcm9tIHN0b3JhZ2VcbiAgICByZXR1cm4gYXdhaXQgcmVhZEZyb21TdG9yYWdlKHsgb3B0aW9uczoge30gfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhZEZyb21TdG9yYWdlKHdoYXRUb0dldCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHdoYXRUb0dldCwgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhclN0b3JhZ2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5jbGVhcihyZXNvbHZlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlVG9TdG9yYWdlKHdoYXRUb1NldCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHdoYXRUb1NldCwgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvbk1lc3NhZ2UobXNnLCBjYWxsYmFjaykge1xuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKFxuICAgIHsgbWVzc2FnZSwgZGF0YSB9LFxuICAgIHNlbmRlcixcbiAgICBzZW5kUmVzcG9uc2VcbiAgKSB7XG4gICAgaWYgKG1lc3NhZ2UgPT09IG1zZykge1xuICAgICAgc2VuZFJlc3BvbnNlKGNhbGxiYWNrKGRhdGEsIHNlbmRlcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZW5kUmVzcG9uc2UobnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7IC8vPC0tIHJldHVybiB0cnVlIHRvIGxldCB0aGUgbWVzc2FnZSBzZW5kZXIga25vdyB0aGF0IEknbSBkZWZpbml0ZWx5IGdvaW5nIHRvIGJlIGNhbGxpbmcgc2VuZFJlc3BvbnNlIChvdGhlcndpc2UsIGl0IHdpbGwgdGltZW91dClcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlbmRNZXNzYWdlVG9DdXJyZW50VGFiKG1lc3NhZ2UsIGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgbGV0IHsgaWQgfSA9IGF3YWl0IGdldEN1cnJlbnRUYWIoKTtcbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShpZCwgeyBtZXNzYWdlLCBkYXRhIH0sIHJlc29sdmUpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VuZE1lc3NhZ2VUb0JhY2tncm91bmQobWVzc2FnZSwgZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IG1lc3NhZ2UsIGRhdGEgfSwgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb250ZW50U2NyaXB0T2JqZWN0KHVybCwgY29udGVudFNjcmlwdHMpIHtcbiAgLy90aGlzIGZ1bmN0aW9uIGdldHMgdGhlIFwibWF0Y2hlc1wiIG9iamVjdCBmb3IgdGhlIGdpdmVuIHVybCAoaWUuIHRoZVxuICAvL29iamVjdCB0aGF0IGxvb2tzIGxpa2U6XG4gIC8ve1xuICAvLyAgICAgXCJtYXRjaGVzXCI6IFtcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vKlwiXSxcbiAgLy8gICAgIFwiZXhjbHVkZV9tYXRjaGVzXCI6IFtcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoPypcIl0sXG4gIC8vICAgICBcImpzXCI6IFtcbiAgLy8gICAgICAgICBcImpzL2NvbnRlbnRTY3JpcHRzL2dvb2dsZS5idW5kbGUuanNcIixcbiAgLy8gICAgICAgICBcImpzL2NvbnRlblNjcmlwdHMvX21haW4uanNcIlxuICAvLyAgICAgXSxcbiAgLy8gICAgIFwibXlfY3VzdG9tX3Byb3BlcnR5XCI6IFwidmFsdWVcIlxuICAvL31cblxuICBmdW5jdGlvbiBpc01hdGNoKHVybCwgdXJsR2xvYnMpIHtcbiAgICBpZiAodXJsICYmIHVybEdsb2JzKSB7XG4gICAgICBmb3IgKGxldCB1cmxHbG9iIG9mIHVybEdsb2JzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB1cmwgPT09IHVybEdsb2IgfHxcbiAgICAgICAgICB1cmxHbG9iID09PSAnPGFsbF91cmxzPicgfHxcbiAgICAgICAgICBjb252ZXJ0TWF0Y2hQYXR0ZXJuVG9SZWdFeHAodXJsR2xvYikudGVzdCh1cmwpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vaWYgY29udGVuU2NyaXB0cyBoYXMgYmVlbiBwYXNzZWQgaW4sIGdldCBpdCBmcm9tIHRoZXJlXG4gIGlmIChjb250ZW50U2NyaXB0cykge1xuICAgIGZvciAobGV0IGNvbnRlbnRTY3JpcHRPYmogb2YgY29udGVudFNjcmlwdHMpIHtcbiAgICAgIGxldCB7IG1hdGNoZXMsIGV4Y2x1ZGVfbWF0Y2hlcyB9ID0gY29udGVudFNjcmlwdE9iajtcbiAgICAgIC8vaWYgdGhlIHVybCBtYXRjaGVzIG9uZSBvZiB0aGUgdXJscyBpbiBcIm1hdGNoZXNcIiBhbmRcbiAgICAgIC8vZG9lcyBOT1QgbWF0Y2ggb25lIG9mIHRoZSB1cmxzIGluIFwiZXhjbHVkZV9tYXRjaGVzXCIsIHJldHVybiB0aGlzIG9ialxuICAgICAgaWYgKGlzTWF0Y2godXJsLCBtYXRjaGVzKSAmJiAhaXNNYXRjaCh1cmwsIGV4Y2x1ZGVfbWF0Y2hlcykpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRTY3JpcHRPYmo7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vb3RoZXJ3aXNlLCBmaXJzdCB0cnkgdG8gZ2V0IGl0IGZyb20gbWFuaWZlc3QuanNvblxuICAgIGxldCBjb250ZW50U2NyaXB0T2JqID0gYXdhaXQgZ2V0Q29udGVudFNjcmlwdE9iamVjdChcbiAgICAgIHVybCxcbiAgICAgIGdldE1hbmlmZXN0KCkuY29udGVudF9zY3JpcHRzIHx8IFtdXG4gICAgKTtcbiAgICBpZiAoY29udGVudFNjcmlwdE9iaikge1xuICAgICAgcmV0dXJuIGNvbnRlbnRTY3JpcHRPYmo7XG4gICAgfVxuXG4gICAgLy9pZiB0aGF0IGRvZXNuJ3Qgd29yaywgdGhlbiB0cnkgdG8gZ2V0IGl0IGZyb20gb3B0aW9uc1xuICAgIHJldHVybiBhd2FpdCBnZXRDb250ZW50U2NyaXB0T2JqZWN0KFxuICAgICAgdXJsLFxuICAgICAgKGF3YWl0IGxvYWRPcHRpb25zKCkpLmNvbnRlbnRfc2NyaXB0cyB8fCBbXVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RXh0ZW5zaW9uSWQoKSB7XG4gIHJldHVybiBjaHJvbWUucnVudGltZS5pZDtcbn1cblxuZnVuY3Rpb24gaXNXaW5kb3dGdWxsc2NyZWVuKHdpbmRvdykge1xuICByZXR1cm4gd2luZG93LnN0YXRlID09PSAnZnVsbHNjcmVlbic7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRXaW5kb3coKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLndpbmRvd3MuZ2V0Q3VycmVudChudWxsLCByZXNvbHZlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbFdpbmRvd3MoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLndpbmRvd3MuZ2V0QWxsKFxuICAgICAge1xuICAgICAgICBwb3B1bGF0ZTogdHJ1ZSxcbiAgICAgICAgd2luZG93VHlwZXM6IFsnbm9ybWFsJ10sXG4gICAgICB9LFxuICAgICAgcmVzb2x2ZVxuICAgICk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50VGFiKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgY3VycmVudFdpbmRvdzogdHJ1ZSwgYWN0aXZlOiB0cnVlIH0sIGZ1bmN0aW9uKHRhYnMpIHtcbiAgICAgIHJlc29sdmUodGFic1swXSk7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0QWxsVGFicygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgdGFicyA9PiB7XG4gICAgICByZXNvbHZlKHRhYnMpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldEFsbFNlbGVjdGVkVGFicygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGN1cnJlbnRXaW5kb3c6IHRydWUsIGhpZ2hsaWdodGVkOiB0cnVlIH0sIHRhYnMgPT4ge1xuICAgICAgcmVzb2x2ZSh0YWJzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlJbmZvKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS5zeXN0ZW0uZGlzcGxheS5nZXRJbmZvKGRpc3BsYXlzID0+IHtcbiAgICAgIHJlc29sdmUoZGlzcGxheXNbMF0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2NyZWVuV2lkdGgoKSB7XG4gIGNvbnN0IGRpc3BsYXlJbmZvID0gYXdhaXQgZ2V0RGlzcGxheUluZm8oKTtcblxuICAvL3VzZSB3b3JrQXJlYSBzaW5jZSB0aGF0IGV4Y2x1ZGVzIHRoZSBtZW51IGJhciBhdCB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cbiAgcmV0dXJuIGRpc3BsYXlJbmZvLndvcmtBcmVhLndpZHRoO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0U2NyZWVuSGVpZ2h0KCkge1xuICBjb25zdCBkaXNwbGF5SW5mbyA9IGF3YWl0IGdldERpc3BsYXlJbmZvKCk7XG5cbiAgLy91c2Ugd29ya0FyZWEgc2luY2UgdGhhdCBleGNsdWRlcyB0aGUgbWVudSBiYXIgYXQgdGhlIHRvcCBvZiB0aGUgc2NyZWVuXG4gIHJldHVybiBkaXNwbGF5SW5mby53b3JrQXJlYS5oZWlnaHQ7XG59XG5cbi8qVGhlIGJlbG93IGlzIGZyb206IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9NYXRjaF9wYXR0ZXJuc1xuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgdmFsaWQgbWF0Y2ggcGF0dGVybiBpbnRvIGEgcmVndWxhciBleHByZXNzaW9uXG4gKiB3aGljaCBtYXRjaGVzIGFsbCBVUkxzIGluY2x1ZGVkIGJ5IHRoYXQgcGF0dGVybi5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBwYXR0ZXJuICBUaGUgcGF0dGVybiB0byB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHtSZWdFeHB9ICAgICAgICAgICBUaGUgcGF0dGVybidzIGVxdWl2YWxlbnQgYXMgYSBSZWdFeHAuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9ICAgICAgICBJZiB0aGUgcGF0dGVybiBpcyBub3QgYSB2YWxpZCBNYXRjaFBhdHRlcm5cbiAqL1xuZnVuY3Rpb24gY29udmVydE1hdGNoUGF0dGVyblRvUmVnRXhwKHBhdHRlcm4pIHtcbiAgaWYgKHBhdHRlcm4gPT09ICcnKSB7XG4gICAgcmV0dXJuIC9eKD86aHR0cHxodHRwc3xmaWxlfGZ0cHxhcHApOlxcL1xcLy87XG4gIH1cblxuICBjb25zdCBzY2hlbWVTZWdtZW50ID0gJyhcXFxcKnxodHRwfGh0dHBzfGZpbGV8ZnRwKSc7XG4gIGNvbnN0IGhvc3RTZWdtZW50ID0gJyhcXFxcKnwoPzpcXFxcKlxcXFwuKT8oPzpbXi8qXSspKT8nO1xuICBjb25zdCBwYXRoU2VnbWVudCA9ICcoLiopJztcbiAgY29uc3QgbWF0Y2hQYXR0ZXJuUmVnRXhwID0gbmV3IFJlZ0V4cChcbiAgICBgXiR7c2NoZW1lU2VnbWVudH06Ly8ke2hvc3RTZWdtZW50fS8ke3BhdGhTZWdtZW50fSRgXG4gICk7XG5cbiAgbGV0IG1hdGNoID0gbWF0Y2hQYXR0ZXJuUmVnRXhwLmV4ZWMocGF0dGVybik7XG4gIGlmICghbWF0Y2gpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7cGF0dGVybn1cIiBpcyBub3QgYSB2YWxpZCBNYXRjaFBhdHRlcm5gKTtcbiAgfVxuXG4gIGxldCBbLCBzY2hlbWUsIGhvc3QsIHBhdGhdID0gbWF0Y2g7XG4gIGlmICghaG9zdCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFwiJHtwYXR0ZXJufVwiIGRvZXMgbm90IGhhdmUgYSB2YWxpZCBob3N0YCk7XG4gIH1cblxuICBsZXQgcmVnZXggPSAnXic7XG5cbiAgaWYgKHNjaGVtZSA9PT0gJyonKSB7XG4gICAgcmVnZXggKz0gJyhodHRwfGh0dHBzKSc7XG4gIH0gZWxzZSB7XG4gICAgcmVnZXggKz0gc2NoZW1lO1xuICB9XG5cbiAgcmVnZXggKz0gJzovLyc7XG5cbiAgaWYgKGhvc3QgJiYgaG9zdCA9PT0gJyonKSB7XG4gICAgcmVnZXggKz0gJ1teL10rPyc7XG4gIH0gZWxzZSBpZiAoaG9zdCkge1xuICAgIGlmIChob3N0Lm1hdGNoKC9eXFwqXFwuLykpIHtcbiAgICAgIHJlZ2V4ICs9ICdbXi9dKj8nO1xuICAgICAgaG9zdCA9IGhvc3Quc3Vic3RyaW5nKDIpO1xuICAgIH1cbiAgICByZWdleCArPSBob3N0LnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKTtcbiAgfVxuXG4gIGlmIChwYXRoKSB7XG4gICAgaWYgKHBhdGggPT09ICcqJykge1xuICAgICAgcmVnZXggKz0gJygvLiopPyc7XG4gICAgfSBlbHNlIGlmIChwYXRoLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgICByZWdleCArPSAnLyc7XG4gICAgICByZWdleCArPSBwYXRoXG4gICAgICAgIC5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJylcbiAgICAgICAgLnJlcGxhY2UoL1xcPy9nLCAnXFxcXD8nKVxuICAgICAgICAucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICAgIHJlZ2V4ICs9ICcvPyc7XG4gICAgfVxuICB9XG5cbiAgcmVnZXggKz0gJyQnO1xuICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCk7XG59XG5cbmV4cG9ydCB7IGNsZWFyU3RvcmFnZSwgZ2V0QWxsU2VsZWN0ZWRUYWJzLCBnZXRBbGxUYWJzLCBnZXRBbGxXaW5kb3dzLCBnZXRDb250ZW50U2NyaXB0T2JqZWN0LCBnZXRDdXJyZW50VGFiLCBnZXRDdXJyZW50V2luZG93LCBnZXRFeHRlbnNpb25JZCwgZ2V0TWFuaWZlc3QsIGdldFNjcmVlbkhlaWdodCwgZ2V0U2NyZWVuV2lkdGgsIGlzV2luZG93RnVsbHNjcmVlbiwgbG9hZE9wdGlvbnMsIG9uTWVzc2FnZSwgcmVhZEZyb21TdG9yYWdlLCBzZW5kTWVzc2FnZVRvQmFja2dyb3VuZCwgc2VuZE1lc3NhZ2VUb0N1cnJlbnRUYWIsIHdyaXRlVG9TdG9yYWdlIH07XG4iXSwic291cmNlUm9vdCI6IiJ9