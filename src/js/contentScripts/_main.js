import Mousetrap from 'mousetrap';
import { registerKeyboardShortcut } from '../common';
import { getContentScriptObject } from '../utils';

(async function main() {
    //override the "stopCallback" function so that the keyboard shortcuts work in
    //input fields
    Mousetrap.stopCallback = function(e, element, combo) {
        //just return false to make sure it never stops the callback (ie. all
        //keyboard shortcuts go through even when an input element is focused)
        return false;
    };

    //NOTE: "PAGE_MODULE" is available as a global variable because
    //each of the page scripts are built as a "library" by webpack, which exports the
    //module as a global variable.  I had to do it this way because chrome extensions don't
    //allow loading actual es modules as content scripts yet.  In the future, each page script
    //should be an es module, which means I'll be able to dynamically "import()" them here (instead
    //of using a global variable), but until then, this is the best solution I could come up with.
    let actions = PAGE_MODULE.default;

    //register all keyboard shortcuts defined in the config
    let keyboardShortcuts = (await getContentScriptObject(window.location.href))
        .keyboard_shortcuts;
    keyboardShortcuts.forEach(({ keyCombo, fnName, args = [] }) => {
        registerKeyboardShortcut(keyCombo, () => actions[fnName](...args));
    });
})();
