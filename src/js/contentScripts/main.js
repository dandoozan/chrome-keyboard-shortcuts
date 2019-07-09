import Mousetrap from 'mousetrap';
import { getMatchesObjectFromManifest } from '../helpers/extension';
import { registerKeyboardShortcut, getMyConfig } from '../common';

//I know I don't need to set this variable, but I'm doing so just
//to make it clear that I'm intentionally using the global Actions
const Actions = window.Actions;

function getKeyboardShortcutsForUrl(url) {
    let { my_config_key } = getMatchesObjectFromManifest(url);
    return getMyConfig().keyboard_shortcuts[my_config_key];
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
    let keyboardShortcuts = getKeyboardShortcutsForUrl(window.location.href);
    keyboardShortcuts.forEach(({ keyCombo, fnName, args = [] }) => {
        registerKeyboardShortcut(keyCombo, () => Actions[fnName](...args));
    });
})();
