import Mousetrap from 'mousetrap';
import { getManifest, getMatchesObjectFromManifest } from './utils';

//I know I don't need to set this variable, but I'm doing so just
//to make it clear that I am using the global Actions intentionally
const Actions = window.Actions;

function isPopupPage(url) {
    return url === `chrome-extension://${chrome.runtime.id}/popup.html`;
}

function getKeyboardShortcutsForPage(url) {
    let keyboardShortcuts = getManifest().my_config.keyboard_shortcuts;

    //if the page is the popup, get the browser keyboardShortcuts
    if (isPopupPage(url)) {
        return keyboardShortcuts.browser;
    }

    //else, get the keyboardShortcuts for the specific webpage
    let { my_config_key } = getMatchesObjectFromManifest(url);
    return keyboardShortcuts[my_config_key];
}

function registerKeyboardShortcut({ keyCombo, fnName, args = [] }) {
    Mousetrap.bind(keyCombo, (e, kcmbo) => {
        Actions[fnName](...args);
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
    let keyboardShortcuts = getKeyboardShortcutsForPage(url);
    console.log('​main -> keyboardShortcuts=', keyboardShortcuts);
    keyboardShortcuts.forEach(keyboardShortcut => {
        registerKeyboardShortcut(keyboardShortcut);
    });
})();
