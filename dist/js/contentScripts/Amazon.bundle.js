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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/contentScripts/Amazon.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/contentScripts/Amazon.js":
/*!*************************************!*\
  !*** ./js/contentScripts/Amazon.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Amazon; });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Page */ "./js/contentScripts/_Page.js");


class Amazon extends _Page__WEBPACK_IMPORTED_MODULE_0__["Page"] {
  static clickNext() {
    let nextButton =
      document.querySelector('.next-button') ||
      document.querySelector(
        '#crReviewRow .cr-lightbox-navigator-button__next'
      );
    if (nextButton) {
      nextButton.click();
    }
  }
  static clickPrevious() {
    let backButton =
      document.querySelector('.back-button') ||
      document.querySelector(
        '#crReviewRow .cr-lightbox-navigator-button__back'
      );
    if (backButton) {
      backButton.click();
    }
  }
  static clickClose() {
    let closeButton = document.querySelector(
      '.a-popover-header [data-action="a-popover-close"]'
    );
    if (closeButton) {
      closeButton.click();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QQUdFX01PRFVMRS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QQUdFX01PRFVMRS8uL2pzL2NvbnRlbnRTY3JpcHRzL0FtYXpvbi5qcyIsIndlYnBhY2s6Ly9QQUdFX01PRFVMRS8uL2pzL2NvbnRlbnRTY3JpcHRzL19QYWdlLmpzIiwid2VicGFjazovL1BBR0VfTU9EVUxFLy4vanMvaGVscGVycy9jaHJvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQStCOztBQUVoQixxQkFBcUIsMENBQUk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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SDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFNlQiLCJmaWxlIjoiL2pzL2NvbnRlbnRTY3JpcHRzL0FtYXpvbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2pzL2NvbnRlbnRTY3JpcHRzL0FtYXpvbi5qc1wiKTtcbiIsImltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL19QYWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW1hem9uIGV4dGVuZHMgUGFnZSB7XG4gIHN0YXRpYyBjbGlja05leHQoKSB7XG4gICAgbGV0IG5leHRCdXR0b24gPVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQtYnV0dG9uJykgfHxcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcjY3JSZXZpZXdSb3cgLmNyLWxpZ2h0Ym94LW5hdmlnYXRvci1idXR0b25fX25leHQnXG4gICAgICApO1xuICAgIGlmIChuZXh0QnV0dG9uKSB7XG4gICAgICBuZXh0QnV0dG9uLmNsaWNrKCk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBjbGlja1ByZXZpb3VzKCkge1xuICAgIGxldCBiYWNrQnV0dG9uID1cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLWJ1dHRvbicpIHx8XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnI2NyUmV2aWV3Um93IC5jci1saWdodGJveC1uYXZpZ2F0b3ItYnV0dG9uX19iYWNrJ1xuICAgICAgKTtcbiAgICBpZiAoYmFja0J1dHRvbikge1xuICAgICAgYmFja0J1dHRvbi5jbGljaygpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgY2xpY2tDbG9zZSgpIHtcbiAgICBsZXQgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5hLXBvcG92ZXItaGVhZGVyIFtkYXRhLWFjdGlvbj1cImEtcG9wb3Zlci1jbG9zZVwiXSdcbiAgICApO1xuICAgIGlmIChjbG9zZUJ1dHRvbikge1xuICAgICAgY2xvc2VCdXR0b24uY2xpY2soKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHNlbmRNZXNzYWdlVG9CYWNrZ3JvdW5kIH0gZnJvbSAnLi4vaGVscGVycy9jaHJvbWUnO1xuXG5leHBvcnQgY2xhc3MgUGFnZSB7XG4gIC8vcHV0IGNvbW1vbiBjb2RlIGZvciBhbGwgcGFnZSBzY3JpcHRzIGhlcmVcbiAgc3RhdGljIGZvY3VzU2VhcmNoQmFyKCkge1xuICAgIGxldCBzZWxlY3RvcnMgPSBbXG4gICAgICAvL2dlbmVyaWNzXG4gICAgICAnaW5wdXQjc2VhcmNoJyxcbiAgICAgICdpbnB1dFt0aXRsZT1cIlNlYXJjaFwiXScsXG4gICAgICAnaW5wdXRbdHlwZT1cIlNlYXJjaFwiXScsXG4gICAgICAnaW5wdXRbcGxhY2Vob2xkZXI9XCJTZWFyY2hcIl0nLFxuXG4gICAgICAnaW5wdXQjdHdvdGFic2VhcmNodGV4dGJveCcsIC8vYW1hem9uXG4gICAgICAnaW5wdXQjZ2xvYmFsLXNlYXJjaC1pbnB1dCcsIC8vd2FsbWFydFxuICAgICAgJ2lucHV0I3NlYXJjaC1pbnB1dCcsIC8vaGFyYm9yIGZyZWlnaHRcbiAgICBdO1xuXG4gICAgbGV0IHNlYXJjaElucHV0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzW2ldKTtcbiAgICAgIGlmIChzZWFyY2hJbnB1dCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlYXJjaElucHV0KSB7XG4gICAgICBzZWFyY2hJbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBzZWFyY2hPbllvdXR1YmUoKSB7XG4gICAgbGV0IHNlYXJjaFRlcm0gPSBhd2FpdCBzZW5kTWVzc2FnZVRvQmFja2dyb3VuZCgnZ2V0Q2xpcGJvYXJkQ29udGVudHMnKTtcbiAgICB3aW5kb3cub3BlbihcbiAgICAgIGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9yZXN1bHRzP3NlYXJjaF9xdWVyeT0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgc2VhcmNoVGVybVxuICAgICAgKX1gXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBzZWFyY2hPbkJyYXZlKCkge1xuICAgIGxldCBzZWFyY2hUZXJtID0gYXdhaXQgc2VuZE1lc3NhZ2VUb0JhY2tncm91bmQoJ2dldENsaXBib2FyZENvbnRlbnRzJyk7XG4gICAgd2luZG93Lm9wZW4oXG4gICAgICBgaHR0cHM6Ly9zZWFyY2guYnJhdmUuY29tL3NlYXJjaD9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pfWBcbiAgICApO1xuICB9XG59XG4iLCJmdW5jdGlvbiBnZXRNYW5pZmVzdCgpIHtcbiAgcmV0dXJuIGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRPcHRpb25zKCkge1xuICAvL2ZpcnN0IHRyeSB0byBnZXQgb3B0aW9ucyBmcm9tIG9wdGlvbnMuanNvblxuICB0cnkge1xuICAgIHJldHVybiByZXF1aXJlKCcuLi8uLi9vcHRpb25zLmpzb24nKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvL290aGVyd2lzZSwgZ2V0IHRoZSBvcHRpb25zIGZyb20gc3RvcmFnZVxuICAgIHJldHVybiBhd2FpdCByZWFkRnJvbVN0b3JhZ2UoeyBvcHRpb25zOiB7fSB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkRnJvbVN0b3JhZ2Uod2hhdFRvR2V0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQod2hhdFRvR2V0LCByZXNvbHZlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyU3RvcmFnZSgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmNsZWFyKHJlc29sdmUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gd3JpdGVUb1N0b3JhZ2Uod2hhdFRvU2V0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQod2hhdFRvU2V0LCByZXNvbHZlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uTWVzc2FnZShtc2csIGNhbGxiYWNrKSB7XG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoXG4gICAgeyBtZXNzYWdlLCBkYXRhIH0sXG4gICAgc2VuZGVyLFxuICAgIHNlbmRSZXNwb25zZVxuICApIHtcbiAgICBpZiAobWVzc2FnZSA9PT0gbXNnKSB7XG4gICAgICBzZW5kUmVzcG9uc2UoY2FsbGJhY2soZGF0YSwgc2VuZGVyKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbmRSZXNwb25zZShudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTsgLy88LS0gcmV0dXJuIHRydWUgdG8gbGV0IHRoZSBtZXNzYWdlIHNlbmRlciBrbm93IHRoYXQgSSdtIGRlZmluaXRlbHkgZ29pbmcgdG8gYmUgY2FsbGluZyBzZW5kUmVzcG9uc2UgKG90aGVyd2lzZSwgaXQgd2lsbCB0aW1lb3V0KVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VuZE1lc3NhZ2VUb0N1cnJlbnRUYWIobWVzc2FnZSwgZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICBsZXQgeyBpZCB9ID0gYXdhaXQgZ2V0Q3VycmVudFRhYigpO1xuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlkLCB7IG1lc3NhZ2UsIGRhdGEgfSwgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZW5kTWVzc2FnZVRvQmFja2dyb3VuZChtZXNzYWdlLCBkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyBmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgbWVzc2FnZSwgZGF0YSB9LCByZXNvbHZlKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbnRlbnRTY3JpcHRPYmplY3QodXJsLCBjb250ZW50U2NyaXB0cykge1xuICAvL3RoaXMgZnVuY3Rpb24gZ2V0cyB0aGUgXCJtYXRjaGVzXCIgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gdXJsIChpZS4gdGhlXG4gIC8vb2JqZWN0IHRoYXQgbG9va3MgbGlrZTpcbiAgLy97XG4gIC8vICAgICBcIm1hdGNoZXNcIjogW1wiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8qXCJdLFxuICAvLyAgICAgXCJleGNsdWRlX21hdGNoZXNcIjogW1wiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/KlwiXSxcbiAgLy8gICAgIFwianNcIjogW1xuICAvLyAgICAgICAgIFwianMvY29udGVudFNjcmlwdHMvZ29vZ2xlLmJ1bmRsZS5qc1wiLFxuICAvLyAgICAgICAgIFwianMvY29udGVuU2NyaXB0cy9fbWFpbi5qc1wiXG4gIC8vICAgICBdLFxuICAvLyAgICAgXCJteV9jdXN0b21fcHJvcGVydHlcIjogXCJ2YWx1ZVwiXG4gIC8vfVxuXG4gIGZ1bmN0aW9uIGlzTWF0Y2godXJsLCB1cmxHbG9icykge1xuICAgIGlmICh1cmwgJiYgdXJsR2xvYnMpIHtcbiAgICAgIGZvciAobGV0IHVybEdsb2Igb2YgdXJsR2xvYnMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHVybCA9PT0gdXJsR2xvYiB8fFxuICAgICAgICAgIHVybEdsb2IgPT09ICc8YWxsX3VybHM+JyB8fFxuICAgICAgICAgIGNvbnZlcnRNYXRjaFBhdHRlcm5Ub1JlZ0V4cCh1cmxHbG9iKS50ZXN0KHVybClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy9pZiBjb250ZW5TY3JpcHRzIGhhcyBiZWVuIHBhc3NlZCBpbiwgZ2V0IGl0IGZyb20gdGhlcmVcbiAgaWYgKGNvbnRlbnRTY3JpcHRzKSB7XG4gICAgZm9yIChsZXQgY29udGVudFNjcmlwdE9iaiBvZiBjb250ZW50U2NyaXB0cykge1xuICAgICAgbGV0IHsgbWF0Y2hlcywgZXhjbHVkZV9tYXRjaGVzIH0gPSBjb250ZW50U2NyaXB0T2JqO1xuICAgICAgLy9pZiB0aGUgdXJsIG1hdGNoZXMgb25lIG9mIHRoZSB1cmxzIGluIFwibWF0Y2hlc1wiIGFuZFxuICAgICAgLy9kb2VzIE5PVCBtYXRjaCBvbmUgb2YgdGhlIHVybHMgaW4gXCJleGNsdWRlX21hdGNoZXNcIiwgcmV0dXJuIHRoaXMgb2JqXG4gICAgICBpZiAoaXNNYXRjaCh1cmwsIG1hdGNoZXMpICYmICFpc01hdGNoKHVybCwgZXhjbHVkZV9tYXRjaGVzKSkge1xuICAgICAgICByZXR1cm4gY29udGVudFNjcmlwdE9iajtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy9vdGhlcndpc2UsIGZpcnN0IHRyeSB0byBnZXQgaXQgZnJvbSBtYW5pZmVzdC5qc29uXG4gICAgbGV0IGNvbnRlbnRTY3JpcHRPYmogPSBhd2FpdCBnZXRDb250ZW50U2NyaXB0T2JqZWN0KFxuICAgICAgdXJsLFxuICAgICAgZ2V0TWFuaWZlc3QoKS5jb250ZW50X3NjcmlwdHMgfHwgW11cbiAgICApO1xuICAgIGlmIChjb250ZW50U2NyaXB0T2JqKSB7XG4gICAgICByZXR1cm4gY29udGVudFNjcmlwdE9iajtcbiAgICB9XG5cbiAgICAvL2lmIHRoYXQgZG9lc24ndCB3b3JrLCB0aGVuIHRyeSB0byBnZXQgaXQgZnJvbSBvcHRpb25zXG4gICAgcmV0dXJuIGF3YWl0IGdldENvbnRlbnRTY3JpcHRPYmplY3QoXG4gICAgICB1cmwsXG4gICAgICAoYXdhaXQgbG9hZE9wdGlvbnMoKSkuY29udGVudF9zY3JpcHRzIHx8IFtdXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFeHRlbnNpb25JZCgpIHtcbiAgcmV0dXJuIGNocm9tZS5ydW50aW1lLmlkO1xufVxuXG5mdW5jdGlvbiBpc1dpbmRvd0Z1bGxzY3JlZW4od2luZG93KSB7XG4gIHJldHVybiB3aW5kb3cuc3RhdGUgPT09ICdmdWxsc2NyZWVuJztcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFdpbmRvdygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjaHJvbWUud2luZG93cy5nZXRDdXJyZW50KG51bGwsIHJlc29sdmUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsV2luZG93cygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjaHJvbWUud2luZG93cy5nZXRBbGwoXG4gICAgICB7XG4gICAgICAgIHBvcHVsYXRlOiB0cnVlLFxuICAgICAgICB3aW5kb3dUeXBlczogWydub3JtYWwnXSxcbiAgICAgIH0sXG4gICAgICByZXNvbHZlXG4gICAgKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRUYWIoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBjdXJyZW50V2luZG93OiB0cnVlLCBhY3RpdmU6IHRydWUgfSwgZnVuY3Rpb24odGFicykge1xuICAgICAgcmVzb2x2ZSh0YWJzWzBdKTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRBbGxUYWJzKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCB0YWJzID0+IHtcbiAgICAgIHJlc29sdmUodGFicyk7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0QWxsU2VsZWN0ZWRUYWJzKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgY3VycmVudFdpbmRvdzogdHJ1ZSwgaGlnaGxpZ2h0ZWQ6IHRydWUgfSwgdGFicyA9PiB7XG4gICAgICByZXNvbHZlKHRhYnMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheUluZm8oKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2hyb21lLnN5c3RlbS5kaXNwbGF5LmdldEluZm8oZGlzcGxheXMgPT4ge1xuICAgICAgcmVzb2x2ZShkaXNwbGF5c1swXSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTY3JlZW5XaWR0aCgpIHtcbiAgY29uc3QgZGlzcGxheUluZm8gPSBhd2FpdCBnZXREaXNwbGF5SW5mbygpO1xuXG4gIC8vdXNlIHdvcmtBcmVhIHNpbmNlIHRoYXQgZXhjbHVkZXMgdGhlIG1lbnUgYmFyIGF0IHRoZSB0b3Agb2YgdGhlIHNjcmVlblxuICByZXR1cm4gZGlzcGxheUluZm8ud29ya0FyZWEud2lkdGg7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRTY3JlZW5IZWlnaHQoKSB7XG4gIGNvbnN0IGRpc3BsYXlJbmZvID0gYXdhaXQgZ2V0RGlzcGxheUluZm8oKTtcblxuICAvL3VzZSB3b3JrQXJlYSBzaW5jZSB0aGF0IGV4Y2x1ZGVzIHRoZSBtZW51IGJhciBhdCB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cbiAgcmV0dXJuIGRpc3BsYXlJbmZvLndvcmtBcmVhLmhlaWdodDtcbn1cblxuLypUaGUgYmVsb3cgaXMgZnJvbTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvQWRkLW9ucy9XZWJFeHRlbnNpb25zL01hdGNoX3BhdHRlcm5zXG4vKipcbiAqIFRyYW5zZm9ybXMgYSB2YWxpZCBtYXRjaCBwYXR0ZXJuIGludG8gYSByZWd1bGFyIGV4cHJlc3Npb25cbiAqIHdoaWNoIG1hdGNoZXMgYWxsIFVSTHMgaW5jbHVkZWQgYnkgdGhhdCBwYXR0ZXJuLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHBhdHRlcm4gIFRoZSBwYXR0ZXJuIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4ge1JlZ0V4cH0gICAgICAgICAgIFRoZSBwYXR0ZXJuJ3MgZXF1aXZhbGVudCBhcyBhIFJlZ0V4cC5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gICAgICAgIElmIHRoZSBwYXR0ZXJuIGlzIG5vdCBhIHZhbGlkIE1hdGNoUGF0dGVyblxuICovXG5mdW5jdGlvbiBjb252ZXJ0TWF0Y2hQYXR0ZXJuVG9SZWdFeHAocGF0dGVybikge1xuICBpZiAocGF0dGVybiA9PT0gJycpIHtcbiAgICByZXR1cm4gL14oPzpodHRwfGh0dHBzfGZpbGV8ZnRwfGFwcCk6XFwvXFwvLztcbiAgfVxuXG4gIGNvbnN0IHNjaGVtZVNlZ21lbnQgPSAnKFxcXFwqfGh0dHB8aHR0cHN8ZmlsZXxmdHApJztcbiAgY29uc3QgaG9zdFNlZ21lbnQgPSAnKFxcXFwqfCg/OlxcXFwqXFxcXC4pPyg/OlteLypdKykpPyc7XG4gIGNvbnN0IHBhdGhTZWdtZW50ID0gJyguKiknO1xuICBjb25zdCBtYXRjaFBhdHRlcm5SZWdFeHAgPSBuZXcgUmVnRXhwKFxuICAgIGBeJHtzY2hlbWVTZWdtZW50fTovLyR7aG9zdFNlZ21lbnR9LyR7cGF0aFNlZ21lbnR9JGBcbiAgKTtcblxuICBsZXQgbWF0Y2ggPSBtYXRjaFBhdHRlcm5SZWdFeHAuZXhlYyhwYXR0ZXJuKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFwiJHtwYXR0ZXJufVwiIGlzIG5vdCBhIHZhbGlkIE1hdGNoUGF0dGVybmApO1xuICB9XG5cbiAgbGV0IFssIHNjaGVtZSwgaG9zdCwgcGF0aF0gPSBtYXRjaDtcbiAgaWYgKCFob3N0KSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgXCIke3BhdHRlcm59XCIgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIGhvc3RgKTtcbiAgfVxuXG4gIGxldCByZWdleCA9ICdeJztcblxuICBpZiAoc2NoZW1lID09PSAnKicpIHtcbiAgICByZWdleCArPSAnKGh0dHB8aHR0cHMpJztcbiAgfSBlbHNlIHtcbiAgICByZWdleCArPSBzY2hlbWU7XG4gIH1cblxuICByZWdleCArPSAnOi8vJztcblxuICBpZiAoaG9zdCAmJiBob3N0ID09PSAnKicpIHtcbiAgICByZWdleCArPSAnW14vXSs/JztcbiAgfSBlbHNlIGlmIChob3N0KSB7XG4gICAgaWYgKGhvc3QubWF0Y2goL15cXCpcXC4vKSkge1xuICAgICAgcmVnZXggKz0gJ1teL10qPyc7XG4gICAgICBob3N0ID0gaG9zdC5zdWJzdHJpbmcoMik7XG4gICAgfVxuICAgIHJlZ2V4ICs9IGhvc3QucmVwbGFjZSgvXFwuL2csICdcXFxcLicpO1xuICB9XG5cbiAgaWYgKHBhdGgpIHtcbiAgICBpZiAocGF0aCA9PT0gJyonKSB7XG4gICAgICByZWdleCArPSAnKC8uKik/JztcbiAgICB9IGVsc2UgaWYgKHBhdGguY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgIHJlZ2V4ICs9ICcvJztcbiAgICAgIHJlZ2V4ICs9IHBhdGhcbiAgICAgICAgLnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKVxuICAgICAgICAucmVwbGFjZSgvXFw/L2csICdcXFxcPycpXG4gICAgICAgIC5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgICAgcmVnZXggKz0gJy8/JztcbiAgICB9XG4gIH1cblxuICByZWdleCArPSAnJCc7XG4gIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4KTtcbn1cblxuZXhwb3J0IHsgY2xlYXJTdG9yYWdlLCBnZXRBbGxTZWxlY3RlZFRhYnMsIGdldEFsbFRhYnMsIGdldEFsbFdpbmRvd3MsIGdldENvbnRlbnRTY3JpcHRPYmplY3QsIGdldEN1cnJlbnRUYWIsIGdldEN1cnJlbnRXaW5kb3csIGdldEV4dGVuc2lvbklkLCBnZXRNYW5pZmVzdCwgZ2V0U2NyZWVuSGVpZ2h0LCBnZXRTY3JlZW5XaWR0aCwgaXNXaW5kb3dGdWxsc2NyZWVuLCBsb2FkT3B0aW9ucywgb25NZXNzYWdlLCByZWFkRnJvbVN0b3JhZ2UsIHNlbmRNZXNzYWdlVG9CYWNrZ3JvdW5kLCBzZW5kTWVzc2FnZVRvQ3VycmVudFRhYiwgd3JpdGVUb1N0b3JhZ2UgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=