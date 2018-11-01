// console.log('dpd here');
const Mousetrap = require('mousetrap');

var KS = {
    _keyboardShortcuts: [],
    getKeyboardShortcuts() {
        return this._keyboardShortcuts;
    },
    addToKeyboardShortcutsArray(keyCombo, fn, params) {
        this._keyboardShortcuts.push({
            keyCombo,
            action: fn.name,
        });
    },
    add(keyCombo, fn, ...params) {
        //register keyboard shortcut with Mousetrap
        Mousetrap.bind(keyCombo, (e, kcmbo) => {
            //todo: display a toast here
            fn(...params);
            return false; //prevent default (from the docs: "Returning false here works the same way as jQuery's return false. It prevents the default action and stops the event from bubbling up.")
        });

        //add it to my list of keyboard shortcuts
        this.addToKeyboardShortcutsArray(keyCombo, fn, params)
    },
}

//override the "stopCallback" function so that the keyboard shortcuts work in
//input fields
Mousetrap.stopCallback = function (e, element, combo) {
    //just return false to make sure it never stops the callback (ie. all
    //keyboard shortcuts go through all the time)
    return false;

    //Note: below is the default implementation (gotten from: https://craig.is/killing/mice)
    /*
    //if the element has the class "mousetrap" then no need to stop
    if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
        return false;
    }

    // stop for input, select, and textarea
    return element.tagName == 'INPUT' || element.tagName == 'SELECT' ||
    element.tagName == 'TEXTAREA' || (element.contentEditable &&
    element.contentEditable == 'true');
    */
}

//add listener from popup
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.req === 'getKeyboardShortcuts') {
        const data = KS.getKeyboardShortcuts();
        sendResponse(data);
    }
});