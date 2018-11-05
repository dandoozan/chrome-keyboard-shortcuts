const keyboardShortcuts = [];

export function getKeyboardShortcuts() {
    return keyboardShortcuts;
}

function addToKeyboardShortcutsArray(keyCombo, actionName) {
    keyboardShortcuts.push({
        keyCombo,
        actionName,
    });
}
export function add(keyCombo, actionName, fn, ...params) {
    //register keyboard shortcut with Mousetrap
    const Mousetrap = require('mousetrap');
    Mousetrap.bind(keyCombo, (e, kcmbo) => {
        //todo: display a toast here
        fn(...params);
        return false; //prevent default (from the docs: "Returning false here works the same way as jQuery's return false. It prevents the default action and stops the event from bubbling up.")
    });
    //add it to my list of keyboard shortcuts
    addToKeyboardShortcutsArray(keyCombo, actionName);
}