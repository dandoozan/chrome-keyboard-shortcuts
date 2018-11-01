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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/contentScripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mousetrap/mousetrap.js":
/*!*********************************************!*\
  !*** ./node_modules/mousetrap/mousetrap.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*global define:false */\n/**\n * Copyright 2012-2017 Craig Campbell\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n *\n * Mousetrap is a simple keyboard shortcut library for Javascript with\n * no external dependencies\n *\n * @version 1.6.2\n * @url craig.is/killing/mice\n */\n(function(window, document, undefined) {\n\n    // Check if mousetrap is used inside browser, if not, return\n    if (!window) {\n        return;\n    }\n\n    /**\n     * mapping of special keycodes to their corresponding keys\n     *\n     * everything in this dictionary cannot use keypress events\n     * so it has to be here to map to the correct keycodes for\n     * keyup/keydown events\n     *\n     * @type {Object}\n     */\n    var _MAP = {\n        8: 'backspace',\n        9: 'tab',\n        13: 'enter',\n        16: 'shift',\n        17: 'ctrl',\n        18: 'alt',\n        20: 'capslock',\n        27: 'esc',\n        32: 'space',\n        33: 'pageup',\n        34: 'pagedown',\n        35: 'end',\n        36: 'home',\n        37: 'left',\n        38: 'up',\n        39: 'right',\n        40: 'down',\n        45: 'ins',\n        46: 'del',\n        91: 'meta',\n        93: 'meta',\n        224: 'meta'\n    };\n\n    /**\n     * mapping for special characters so they can support\n     *\n     * this dictionary is only used incase you want to bind a\n     * keyup or keydown event to one of these keys\n     *\n     * @type {Object}\n     */\n    var _KEYCODE_MAP = {\n        106: '*',\n        107: '+',\n        109: '-',\n        110: '.',\n        111 : '/',\n        186: ';',\n        187: '=',\n        188: ',',\n        189: '-',\n        190: '.',\n        191: '/',\n        192: '`',\n        219: '[',\n        220: '\\\\',\n        221: ']',\n        222: '\\''\n    };\n\n    /**\n     * this is a mapping of keys that require shift on a US keypad\n     * back to the non shift equivelents\n     *\n     * this is so you can use keyup events with these keys\n     *\n     * note that this will only work reliably on US keyboards\n     *\n     * @type {Object}\n     */\n    var _SHIFT_MAP = {\n        '~': '`',\n        '!': '1',\n        '@': '2',\n        '#': '3',\n        '$': '4',\n        '%': '5',\n        '^': '6',\n        '&': '7',\n        '*': '8',\n        '(': '9',\n        ')': '0',\n        '_': '-',\n        '+': '=',\n        ':': ';',\n        '\\\"': '\\'',\n        '<': ',',\n        '>': '.',\n        '?': '/',\n        '|': '\\\\'\n    };\n\n    /**\n     * this is a list of special strings you can use to map\n     * to modifier keys when you specify your keyboard shortcuts\n     *\n     * @type {Object}\n     */\n    var _SPECIAL_ALIASES = {\n        'option': 'alt',\n        'command': 'meta',\n        'return': 'enter',\n        'escape': 'esc',\n        'plus': '+',\n        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'\n    };\n\n    /**\n     * variable to store the flipped version of _MAP from above\n     * needed to check if we should use keypress or not when no action\n     * is specified\n     *\n     * @type {Object|undefined}\n     */\n    var _REVERSE_MAP;\n\n    /**\n     * loop through the f keys, f1 to f19 and add them to the map\n     * programatically\n     */\n    for (var i = 1; i < 20; ++i) {\n        _MAP[111 + i] = 'f' + i;\n    }\n\n    /**\n     * loop through to map numbers on the numeric keypad\n     */\n    for (i = 0; i <= 9; ++i) {\n\n        // This needs to use a string cause otherwise since 0 is falsey\n        // mousetrap will never fire for numpad 0 pressed as part of a keydown\n        // event.\n        //\n        // @see https://github.com/ccampbell/mousetrap/pull/258\n        _MAP[i + 96] = i.toString();\n    }\n\n    /**\n     * cross browser add event method\n     *\n     * @param {Element|HTMLDocument} object\n     * @param {string} type\n     * @param {Function} callback\n     * @returns void\n     */\n    function _addEvent(object, type, callback) {\n        if (object.addEventListener) {\n            object.addEventListener(type, callback, false);\n            return;\n        }\n\n        object.attachEvent('on' + type, callback);\n    }\n\n    /**\n     * takes the event and returns the key character\n     *\n     * @param {Event} e\n     * @return {string}\n     */\n    function _characterFromEvent(e) {\n\n        // for keypress events we should return the character as is\n        if (e.type == 'keypress') {\n            var character = String.fromCharCode(e.which);\n\n            // if the shift key is not pressed then it is safe to assume\n            // that we want the character to be lowercase.  this means if\n            // you accidentally have caps lock on then your key bindings\n            // will continue to work\n            //\n            // the only side effect that might not be desired is if you\n            // bind something like 'A' cause you want to trigger an\n            // event when capital A is pressed caps lock will no longer\n            // trigger the event.  shift+a will though.\n            if (!e.shiftKey) {\n                character = character.toLowerCase();\n            }\n\n            return character;\n        }\n\n        // for non keypress events the special maps are needed\n        if (_MAP[e.which]) {\n            return _MAP[e.which];\n        }\n\n        if (_KEYCODE_MAP[e.which]) {\n            return _KEYCODE_MAP[e.which];\n        }\n\n        // if it is not in the special map\n\n        // with keydown and keyup events the character seems to always\n        // come in as an uppercase character whether you are pressing shift\n        // or not.  we should make sure it is always lowercase for comparisons\n        return String.fromCharCode(e.which).toLowerCase();\n    }\n\n    /**\n     * checks if two arrays are equal\n     *\n     * @param {Array} modifiers1\n     * @param {Array} modifiers2\n     * @returns {boolean}\n     */\n    function _modifiersMatch(modifiers1, modifiers2) {\n        return modifiers1.sort().join(',') === modifiers2.sort().join(',');\n    }\n\n    /**\n     * takes a key event and figures out what the modifiers are\n     *\n     * @param {Event} e\n     * @returns {Array}\n     */\n    function _eventModifiers(e) {\n        var modifiers = [];\n\n        if (e.shiftKey) {\n            modifiers.push('shift');\n        }\n\n        if (e.altKey) {\n            modifiers.push('alt');\n        }\n\n        if (e.ctrlKey) {\n            modifiers.push('ctrl');\n        }\n\n        if (e.metaKey) {\n            modifiers.push('meta');\n        }\n\n        return modifiers;\n    }\n\n    /**\n     * prevents default for this event\n     *\n     * @param {Event} e\n     * @returns void\n     */\n    function _preventDefault(e) {\n        if (e.preventDefault) {\n            e.preventDefault();\n            return;\n        }\n\n        e.returnValue = false;\n    }\n\n    /**\n     * stops propogation for this event\n     *\n     * @param {Event} e\n     * @returns void\n     */\n    function _stopPropagation(e) {\n        if (e.stopPropagation) {\n            e.stopPropagation();\n            return;\n        }\n\n        e.cancelBubble = true;\n    }\n\n    /**\n     * determines if the keycode specified is a modifier key or not\n     *\n     * @param {string} key\n     * @returns {boolean}\n     */\n    function _isModifier(key) {\n        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';\n    }\n\n    /**\n     * reverses the map lookup so that we can look for specific keys\n     * to see what can and can't use keypress\n     *\n     * @return {Object}\n     */\n    function _getReverseMap() {\n        if (!_REVERSE_MAP) {\n            _REVERSE_MAP = {};\n            for (var key in _MAP) {\n\n                // pull out the numeric keypad from here cause keypress should\n                // be able to detect the keys from the character\n                if (key > 95 && key < 112) {\n                    continue;\n                }\n\n                if (_MAP.hasOwnProperty(key)) {\n                    _REVERSE_MAP[_MAP[key]] = key;\n                }\n            }\n        }\n        return _REVERSE_MAP;\n    }\n\n    /**\n     * picks the best action based on the key combination\n     *\n     * @param {string} key - character for key\n     * @param {Array} modifiers\n     * @param {string=} action passed in\n     */\n    function _pickBestAction(key, modifiers, action) {\n\n        // if no action was picked in we should try to pick the one\n        // that we think would work best for this key\n        if (!action) {\n            action = _getReverseMap()[key] ? 'keydown' : 'keypress';\n        }\n\n        // modifier keys don't work as expected with keypress,\n        // switch to keydown\n        if (action == 'keypress' && modifiers.length) {\n            action = 'keydown';\n        }\n\n        return action;\n    }\n\n    /**\n     * Converts from a string key combination to an array\n     *\n     * @param  {string} combination like \"command+shift+l\"\n     * @return {Array}\n     */\n    function _keysFromString(combination) {\n        if (combination === '+') {\n            return ['+'];\n        }\n\n        combination = combination.replace(/\\+{2}/g, '+plus');\n        return combination.split('+');\n    }\n\n    /**\n     * Gets info for a specific key combination\n     *\n     * @param  {string} combination key combination (\"command+s\" or \"a\" or \"*\")\n     * @param  {string=} action\n     * @returns {Object}\n     */\n    function _getKeyInfo(combination, action) {\n        var keys;\n        var key;\n        var i;\n        var modifiers = [];\n\n        // take the keys from this pattern and figure out what the actual\n        // pattern is all about\n        keys = _keysFromString(combination);\n\n        for (i = 0; i < keys.length; ++i) {\n            key = keys[i];\n\n            // normalize key names\n            if (_SPECIAL_ALIASES[key]) {\n                key = _SPECIAL_ALIASES[key];\n            }\n\n            // if this is not a keypress event then we should\n            // be smart about using shift keys\n            // this will only work for US keyboards however\n            if (action && action != 'keypress' && _SHIFT_MAP[key]) {\n                key = _SHIFT_MAP[key];\n                modifiers.push('shift');\n            }\n\n            // if this key is a modifier then add it to the list of modifiers\n            if (_isModifier(key)) {\n                modifiers.push(key);\n            }\n        }\n\n        // depending on what the key combination is\n        // we will try to pick the best event for it\n        action = _pickBestAction(key, modifiers, action);\n\n        return {\n            key: key,\n            modifiers: modifiers,\n            action: action\n        };\n    }\n\n    function _belongsTo(element, ancestor) {\n        if (element === null || element === document) {\n            return false;\n        }\n\n        if (element === ancestor) {\n            return true;\n        }\n\n        return _belongsTo(element.parentNode, ancestor);\n    }\n\n    function Mousetrap(targetElement) {\n        var self = this;\n\n        targetElement = targetElement || document;\n\n        if (!(self instanceof Mousetrap)) {\n            return new Mousetrap(targetElement);\n        }\n\n        /**\n         * element to attach key events to\n         *\n         * @type {Element}\n         */\n        self.target = targetElement;\n\n        /**\n         * a list of all the callbacks setup via Mousetrap.bind()\n         *\n         * @type {Object}\n         */\n        self._callbacks = {};\n\n        /**\n         * direct map of string combinations to callbacks used for trigger()\n         *\n         * @type {Object}\n         */\n        self._directMap = {};\n\n        /**\n         * keeps track of what level each sequence is at since multiple\n         * sequences can start out with the same sequence\n         *\n         * @type {Object}\n         */\n        var _sequenceLevels = {};\n\n        /**\n         * variable to store the setTimeout call\n         *\n         * @type {null|number}\n         */\n        var _resetTimer;\n\n        /**\n         * temporary state where we will ignore the next keyup\n         *\n         * @type {boolean|string}\n         */\n        var _ignoreNextKeyup = false;\n\n        /**\n         * temporary state where we will ignore the next keypress\n         *\n         * @type {boolean}\n         */\n        var _ignoreNextKeypress = false;\n\n        /**\n         * are we currently inside of a sequence?\n         * type of action (\"keyup\" or \"keydown\" or \"keypress\") or false\n         *\n         * @type {boolean|string}\n         */\n        var _nextExpectedAction = false;\n\n        /**\n         * resets all sequence counters except for the ones passed in\n         *\n         * @param {Object} doNotReset\n         * @returns void\n         */\n        function _resetSequences(doNotReset) {\n            doNotReset = doNotReset || {};\n\n            var activeSequences = false,\n                key;\n\n            for (key in _sequenceLevels) {\n                if (doNotReset[key]) {\n                    activeSequences = true;\n                    continue;\n                }\n                _sequenceLevels[key] = 0;\n            }\n\n            if (!activeSequences) {\n                _nextExpectedAction = false;\n            }\n        }\n\n        /**\n         * finds all callbacks that match based on the keycode, modifiers,\n         * and action\n         *\n         * @param {string} character\n         * @param {Array} modifiers\n         * @param {Event|Object} e\n         * @param {string=} sequenceName - name of the sequence we are looking for\n         * @param {string=} combination\n         * @param {number=} level\n         * @returns {Array}\n         */\n        function _getMatches(character, modifiers, e, sequenceName, combination, level) {\n            var i;\n            var callback;\n            var matches = [];\n            var action = e.type;\n\n            // if there are no events related to this keycode\n            if (!self._callbacks[character]) {\n                return [];\n            }\n\n            // if a modifier key is coming up on its own we should allow it\n            if (action == 'keyup' && _isModifier(character)) {\n                modifiers = [character];\n            }\n\n            // loop through all callbacks for the key that was pressed\n            // and see if any of them match\n            for (i = 0; i < self._callbacks[character].length; ++i) {\n                callback = self._callbacks[character][i];\n\n                // if a sequence name is not specified, but this is a sequence at\n                // the wrong level then move onto the next match\n                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {\n                    continue;\n                }\n\n                // if the action we are looking for doesn't match the action we got\n                // then we should keep going\n                if (action != callback.action) {\n                    continue;\n                }\n\n                // if this is a keypress event and the meta key and control key\n                // are not pressed that means that we need to only look at the\n                // character, otherwise check the modifiers as well\n                //\n                // chrome will not fire a keypress if meta or control is down\n                // safari will fire a keypress if meta or meta+shift is down\n                // firefox will fire a keypress if meta or control is down\n                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {\n\n                    // when you bind a combination or sequence a second time it\n                    // should overwrite the first one.  if a sequenceName or\n                    // combination is specified in this call it does just that\n                    //\n                    // @todo make deleting its own method?\n                    var deleteCombo = !sequenceName && callback.combo == combination;\n                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;\n                    if (deleteCombo || deleteSequence) {\n                        self._callbacks[character].splice(i, 1);\n                    }\n\n                    matches.push(callback);\n                }\n            }\n\n            return matches;\n        }\n\n        /**\n         * actually calls the callback function\n         *\n         * if your callback function returns false this will use the jquery\n         * convention - prevent default and stop propogation on the event\n         *\n         * @param {Function} callback\n         * @param {Event} e\n         * @returns void\n         */\n        function _fireCallback(callback, e, combo, sequence) {\n\n            // if this event should not happen stop here\n            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {\n                return;\n            }\n\n            if (callback(e, combo) === false) {\n                _preventDefault(e);\n                _stopPropagation(e);\n            }\n        }\n\n        /**\n         * handles a character key event\n         *\n         * @param {string} character\n         * @param {Array} modifiers\n         * @param {Event} e\n         * @returns void\n         */\n        self._handleKey = function(character, modifiers, e) {\n            var callbacks = _getMatches(character, modifiers, e);\n            var i;\n            var doNotReset = {};\n            var maxLevel = 0;\n            var processedSequenceCallback = false;\n\n            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence\n            for (i = 0; i < callbacks.length; ++i) {\n                if (callbacks[i].seq) {\n                    maxLevel = Math.max(maxLevel, callbacks[i].level);\n                }\n            }\n\n            // loop through matching callbacks for this key event\n            for (i = 0; i < callbacks.length; ++i) {\n\n                // fire for all sequence callbacks\n                // this is because if for example you have multiple sequences\n                // bound such as \"g i\" and \"g t\" they both need to fire the\n                // callback for matching g cause otherwise you can only ever\n                // match the first one\n                if (callbacks[i].seq) {\n\n                    // only fire callbacks for the maxLevel to prevent\n                    // subsequences from also firing\n                    //\n                    // for example 'a option b' should not cause 'option b' to fire\n                    // even though 'option b' is part of the other sequence\n                    //\n                    // any sequences that do not match here will be discarded\n                    // below by the _resetSequences call\n                    if (callbacks[i].level != maxLevel) {\n                        continue;\n                    }\n\n                    processedSequenceCallback = true;\n\n                    // keep a list of which sequences were matches for later\n                    doNotReset[callbacks[i].seq] = 1;\n                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);\n                    continue;\n                }\n\n                // if there were no sequence matches but we are still here\n                // that means this is a regular match so we should fire that\n                if (!processedSequenceCallback) {\n                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);\n                }\n            }\n\n            // if the key you pressed matches the type of sequence without\n            // being a modifier (ie \"keyup\" or \"keypress\") then we should\n            // reset all sequences that were not matched by this event\n            //\n            // this is so, for example, if you have the sequence \"h a t\" and you\n            // type \"h e a r t\" it does not match.  in this case the \"e\" will\n            // cause the sequence to reset\n            //\n            // modifier keys are ignored because you can have a sequence\n            // that contains modifiers such as \"enter ctrl+space\" and in most\n            // cases the modifier key will be pressed before the next key\n            //\n            // also if you have a sequence such as \"ctrl+b a\" then pressing the\n            // \"b\" key will trigger a \"keypress\" and a \"keydown\"\n            //\n            // the \"keydown\" is expected when there is a modifier, but the\n            // \"keypress\" ends up matching the _nextExpectedAction since it occurs\n            // after and that causes the sequence to reset\n            //\n            // we ignore keypresses in a sequence that directly follow a keydown\n            // for the same character\n            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;\n            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {\n                _resetSequences(doNotReset);\n            }\n\n            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';\n        };\n\n        /**\n         * handles a keydown event\n         *\n         * @param {Event} e\n         * @returns void\n         */\n        function _handleKeyEvent(e) {\n\n            // normalize e.which for key events\n            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion\n            if (typeof e.which !== 'number') {\n                e.which = e.keyCode;\n            }\n\n            var character = _characterFromEvent(e);\n\n            // no character found then stop\n            if (!character) {\n                return;\n            }\n\n            // need to use === for the character check because the character can be 0\n            if (e.type == 'keyup' && _ignoreNextKeyup === character) {\n                _ignoreNextKeyup = false;\n                return;\n            }\n\n            self.handleKey(character, _eventModifiers(e), e);\n        }\n\n        /**\n         * called to set a 1 second timeout on the specified sequence\n         *\n         * this is so after each key press in the sequence you have 1 second\n         * to press the next key before you have to start over\n         *\n         * @returns void\n         */\n        function _resetSequenceTimer() {\n            clearTimeout(_resetTimer);\n            _resetTimer = setTimeout(_resetSequences, 1000);\n        }\n\n        /**\n         * binds a key sequence to an event\n         *\n         * @param {string} combo - combo specified in bind call\n         * @param {Array} keys\n         * @param {Function} callback\n         * @param {string=} action\n         * @returns void\n         */\n        function _bindSequence(combo, keys, callback, action) {\n\n            // start off by adding a sequence level record for this combination\n            // and setting the level to 0\n            _sequenceLevels[combo] = 0;\n\n            /**\n             * callback to increase the sequence level for this sequence and reset\n             * all other sequences that were active\n             *\n             * @param {string} nextAction\n             * @returns {Function}\n             */\n            function _increaseSequence(nextAction) {\n                return function() {\n                    _nextExpectedAction = nextAction;\n                    ++_sequenceLevels[combo];\n                    _resetSequenceTimer();\n                };\n            }\n\n            /**\n             * wraps the specified callback inside of another function in order\n             * to reset all sequence counters as soon as this sequence is done\n             *\n             * @param {Event} e\n             * @returns void\n             */\n            function _callbackAndReset(e) {\n                _fireCallback(callback, e, combo);\n\n                // we should ignore the next key up if the action is key down\n                // or keypress.  this is so if you finish a sequence and\n                // release the key the final key will not trigger a keyup\n                if (action !== 'keyup') {\n                    _ignoreNextKeyup = _characterFromEvent(e);\n                }\n\n                // weird race condition if a sequence ends with the key\n                // another sequence begins with\n                setTimeout(_resetSequences, 10);\n            }\n\n            // loop through keys one at a time and bind the appropriate callback\n            // function.  for any key leading up to the final one it should\n            // increase the sequence. after the final, it should reset all sequences\n            //\n            // if an action is specified in the original bind call then that will\n            // be used throughout.  otherwise we will pass the action that the\n            // next key in the sequence should match.  this allows a sequence\n            // to mix and match keypress and keydown events depending on which\n            // ones are better suited to the key provided\n            for (var i = 0; i < keys.length; ++i) {\n                var isFinal = i + 1 === keys.length;\n                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);\n                _bindSingle(keys[i], wrappedCallback, action, combo, i);\n            }\n        }\n\n        /**\n         * binds a single keyboard combination\n         *\n         * @param {string} combination\n         * @param {Function} callback\n         * @param {string=} action\n         * @param {string=} sequenceName - name of sequence if part of sequence\n         * @param {number=} level - what part of the sequence the command is\n         * @returns void\n         */\n        function _bindSingle(combination, callback, action, sequenceName, level) {\n\n            // store a direct mapped reference for use with Mousetrap.trigger\n            self._directMap[combination + ':' + action] = callback;\n\n            // make sure multiple spaces in a row become a single space\n            combination = combination.replace(/\\s+/g, ' ');\n\n            var sequence = combination.split(' ');\n            var info;\n\n            // if this pattern is a sequence of keys then run through this method\n            // to reprocess each pattern one key at a time\n            if (sequence.length > 1) {\n                _bindSequence(combination, sequence, callback, action);\n                return;\n            }\n\n            info = _getKeyInfo(combination, action);\n\n            // make sure to initialize array if this is the first time\n            // a callback is added for this key\n            self._callbacks[info.key] = self._callbacks[info.key] || [];\n\n            // remove an existing match if there is one\n            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);\n\n            // add this call back to the array\n            // if it is a sequence put it at the beginning\n            // if not put it at the end\n            //\n            // this is important because the way these are processed expects\n            // the sequence ones to come first\n            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({\n                callback: callback,\n                modifiers: info.modifiers,\n                action: info.action,\n                seq: sequenceName,\n                level: level,\n                combo: combination\n            });\n        }\n\n        /**\n         * binds multiple combinations to the same callback\n         *\n         * @param {Array} combinations\n         * @param {Function} callback\n         * @param {string|undefined} action\n         * @returns void\n         */\n        self._bindMultiple = function(combinations, callback, action) {\n            for (var i = 0; i < combinations.length; ++i) {\n                _bindSingle(combinations[i], callback, action);\n            }\n        };\n\n        // start!\n        _addEvent(targetElement, 'keypress', _handleKeyEvent);\n        _addEvent(targetElement, 'keydown', _handleKeyEvent);\n        _addEvent(targetElement, 'keyup', _handleKeyEvent);\n    }\n\n    /**\n     * binds an event to mousetrap\n     *\n     * can be a single key, a combination of keys separated with +,\n     * an array of keys, or a sequence of keys separated by spaces\n     *\n     * be sure to list the modifier keys first to make sure that the\n     * correct key ends up getting bound (the last key in the pattern)\n     *\n     * @param {string|Array} keys\n     * @param {Function} callback\n     * @param {string=} action - 'keypress', 'keydown', or 'keyup'\n     * @returns void\n     */\n    Mousetrap.prototype.bind = function(keys, callback, action) {\n        var self = this;\n        keys = keys instanceof Array ? keys : [keys];\n        self._bindMultiple.call(self, keys, callback, action);\n        return self;\n    };\n\n    /**\n     * unbinds an event to mousetrap\n     *\n     * the unbinding sets the callback function of the specified key combo\n     * to an empty function and deletes the corresponding key in the\n     * _directMap dict.\n     *\n     * TODO: actually remove this from the _callbacks dictionary instead\n     * of binding an empty function\n     *\n     * the keycombo+action has to be exactly the same as\n     * it was defined in the bind method\n     *\n     * @param {string|Array} keys\n     * @param {string} action\n     * @returns void\n     */\n    Mousetrap.prototype.unbind = function(keys, action) {\n        var self = this;\n        return self.bind.call(self, keys, function() {}, action);\n    };\n\n    /**\n     * triggers an event that has already been bound\n     *\n     * @param {string} keys\n     * @param {string=} action\n     * @returns void\n     */\n    Mousetrap.prototype.trigger = function(keys, action) {\n        var self = this;\n        if (self._directMap[keys + ':' + action]) {\n            self._directMap[keys + ':' + action]({}, keys);\n        }\n        return self;\n    };\n\n    /**\n     * resets the library back to its initial state.  this is useful\n     * if you want to clear out the current keyboard shortcuts and bind\n     * new ones - for example if you switch to another page\n     *\n     * @returns void\n     */\n    Mousetrap.prototype.reset = function() {\n        var self = this;\n        self._callbacks = {};\n        self._directMap = {};\n        return self;\n    };\n\n    /**\n     * should we stop this event before firing off callbacks\n     *\n     * @param {Event} e\n     * @param {Element} element\n     * @return {boolean}\n     */\n    Mousetrap.prototype.stopCallback = function(e, element) {\n        var self = this;\n\n        // if the element has the class \"mousetrap\" then no need to stop\n        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {\n            return false;\n        }\n\n        if (_belongsTo(element, self.target)) {\n            return false;\n        }\n\n        // stop for input, select, and textarea\n        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;\n    };\n\n    /**\n     * exposes _handleKey publicly so it can be overwritten by extensions\n     */\n    Mousetrap.prototype.handleKey = function() {\n        var self = this;\n        return self._handleKey.apply(self, arguments);\n    };\n\n    /**\n     * allow custom key mappings\n     */\n    Mousetrap.addKeycodes = function(object) {\n        for (var key in object) {\n            if (object.hasOwnProperty(key)) {\n                _MAP[key] = object[key];\n            }\n        }\n        _REVERSE_MAP = null;\n    };\n\n    /**\n     * Init the global mousetrap functions\n     *\n     * This method is needed to allow the global mousetrap functions to work\n     * now that mousetrap is a constructor function.\n     */\n    Mousetrap.init = function() {\n        var documentMousetrap = Mousetrap(document);\n        for (var method in documentMousetrap) {\n            if (method.charAt(0) !== '_') {\n                Mousetrap[method] = (function(method) {\n                    return function() {\n                        return documentMousetrap[method].apply(documentMousetrap, arguments);\n                    };\n                } (method));\n            }\n        }\n    };\n\n    Mousetrap.init();\n\n    // expose mousetrap to the global object\n    window.Mousetrap = Mousetrap;\n\n    // expose as a common js module\n    if ( true && module.exports) {\n        module.exports = Mousetrap;\n    }\n\n    // expose mousetrap as an AMD module\n    if (true) {\n        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n            return Mousetrap;\n        }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    }\n}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);\n\n\n//# sourceURL=webpack:///./node_modules/mousetrap/mousetrap.js?");

/***/ }),

/***/ "./src/js/contentScripts/main.js":
/*!***************************************!*\
  !*** ./src/js/contentScripts/main.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// console.log('dpd here');\nconst Mousetrap = __webpack_require__(/*! mousetrap */ \"./node_modules/mousetrap/mousetrap.js\");\n\n//override the \"stopCallback\" function so that the keyboard shortcuts work in\n//input fields\nMousetrap.stopCallback = function (e, element, combo) {\n    //just return false to make sure it never stops the callback (ie. all\n    //keyboard shortcuts go through all the time)\n    return false;\n\n    //Note: below is the default implementation (gotten from: https://craig.is/killing/mice)\n    /*\n    //if the element has the class \"mousetrap\" then no need to stop\n    if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {\n        return false;\n    }\n\n    // stop for input, select, and textarea\n    return element.tagName == 'INPUT' || element.tagName == 'SELECT' ||\n    element.tagName == 'TEXTAREA' || (element.contentEditable &&\n    element.contentEditable == 'true');\n    */\n}\n\n//add listener from popup\nchrome.extension.onMessage.addListener(function (request, sender, sendResponse) {\n    if (request.req === 'getKeyboardShortcuts') {\n        const data = KS.getKeyboardShortcuts();\n        sendResponse(data);\n    }\n});\n\n//# sourceURL=webpack:///./src/js/contentScripts/main.js?");

/***/ })

/******/ });