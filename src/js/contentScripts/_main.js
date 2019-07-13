import Mousetrap from 'mousetrap';
import { getMatchesObjectFromManifest } from '../helpers/extension';
import { registerKeyboardShortcut, getMyConfig } from '../common';

function getKeyboardShortcuts(url) {
    let { my_config_key } = getMatchesObjectFromManifest(url);
    return getMyConfig().keyboard_shortcuts[my_config_key];
}

(async function main() {
    //override the "stopCallback" function so that the keyboard shortcuts work in
    //input fields
    Mousetrap.stopCallback = function(e, element, combo) {
        //just return false to make sure it never stops the callback (ie. all
        //keyboard shortcuts go through even when an input element is focused)
        return false;
    };

    //get the page module (NOTE: "pageModule" is available as a global variable because
    //each of the page scripts are built as a "library" by webpack, which exports the
    //module as a global variable.  I had to do it this way because chrome extensions don't
    //allow loading actual es modules as content scripts yet.  In the future, each page script
    //should be an es module, which means I'll be able to dynamically "import()" them here (instead
    //of using a global variable), but until then, this is the best solution I could come up with.
    let actions = pageModule.default;

    //register all keyboard shortcuts defined in the config (in manifest.json)
    getKeyboardShortcuts(window.location.href).forEach(
        ({ keyCombo, fnName, args = [] }) => {
            registerKeyboardShortcut(keyCombo, () => actions[fnName](...args));
        }
    );
})();
