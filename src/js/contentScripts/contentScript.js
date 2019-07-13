import Mousetrap from 'mousetrap';
import { getMatchesObjectFromManifest } from '../helpers/extension';
import { registerKeyboardShortcut, getMyConfig } from '../common';
// import actions from './GooglePageActions'


function getKeyboardShortcutsForUrl(url) {
    let { my_config_key } = getMatchesObjectFromManifest(url);
    return getMyConfig().keyboard_shortcuts[my_config_key];
}

async function getActions() {
    //I have to dynamically import this from the chrome extension url bc chrome
    //doesn't allow content scripts to be "modules" yet (so I couldn't specify this
    //file to be loaded on the page as a content script in manifest.json)
    var pageClassUrl = chrome.runtime.getURL('js/contentScripts/pageSpecific/GooglePageActions.bundle.js');

    var actions = (await import(/* webpackIgnore: true */ pageClassUrl)).default;
    console.log('​getActions -> actions=', actions);

    return actions;
}

(async function main() {
    //override the "stopCallback" function so that the keyboard shortcuts work in
    //input fields
    Mousetrap.stopCallback = function(e, element, combo) {
        //just return false to make sure it never stops the callback (ie. all
        //keyboard shortcuts go through even when an input element is focused)
        return false;
    };

    //this gets the appropriate PageActions class
    let actions = await getActions();

    //register all keyboard shortcuts in the config
    let keyboardShortcuts = getKeyboardShortcutsForUrl(window.location.href);

    keyboardShortcuts.forEach(({ keyCombo, fnName, args = [] }) => {
        registerKeyboardShortcut(keyCombo, () => actions[fnName](...args));
    });
})();
