import Mousetrap from 'mousetrap';

export function fetchConfig() {
    return require('../config.json');
}

export function registerKeyboardShortcut(trigger, fn) {
    Mousetrap.bind(trigger, (e, kcmbo) => {
        fn();
        return false; //prevent default (ie. prevent the keycombo from triggering other browser or webpage shortcuts)
    });
}
