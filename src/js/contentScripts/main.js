import Mousetrap from 'mousetrap';
import { getManifest, getMatchesObjectFromManifest } from '../utils';

//I know I don't need to set this variable, but I'm doing so just
//to make it clear that I am using the global PageActions intentionally
const PageActions = window.PageActions;

function getKeyboardShortcutsForUrl(url) {
    let { myConfigKey } = getMatchesObjectFromManifest(url);
    return getManifest().myConfig.keyboard_shortcuts[myConfigKey];
}

function registerKeyboardShortcut({ keyCombo, fnName, args = [] }) {
    Mousetrap.bind(keyCombo, (e, kcmbo) => {
        PageActions[fnName](...args);
        return false; //prevent default
    });
}

(function main() {
    //override the "stopCallback" function so that the keyboard shortcuts work in
    //input fields
    Mousetrap.stopCallback = function(e, element, combo) {
        //just return false to make sure it never stops the callback (ie. all
        //keyboard shortcuts go through even when an input element is focused)
        return false;
    };

    //register all keyboard shortcuts in the config
    let url = window.location.href;
    console.log('​main -> url=', url);
    let keyboardShortcuts = getKeyboardShortcutsForUrl(url);
    console.log('​main -> keyboardShortcuts=', keyboardShortcuts);
    keyboardShortcuts.forEach(keyboardShortcut => {
        registerKeyboardShortcut(keyboardShortcut);
    });
})();
