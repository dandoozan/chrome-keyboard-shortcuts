// console.log('dpd here');

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
            fn(...params);
            return false; //prevent default (from the docs: "Returning false here works the same way as jQuery's return false. It prevents the default action and stops the event from bubbling up.")
        });

        //add it to my list of keyboard shortcuts
        this.addToKeyboardShortcutsArray(keyCombo, fn, params)
    },
}

//add listener from popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.req === 'getKeyboardShortcuts'){
        const data = KS.getKeyboardShortcuts();
        sendResponse(data);
    }
});

