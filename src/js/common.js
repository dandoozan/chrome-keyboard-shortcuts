import Mousetrap from 'mousetrap';
import { getManifest } from './helpers/extension';

export function getMyConfig() {
    return getManifest().my_config;
}

export function registerKeyboardShortcut(trigger, fn) {
    Mousetrap.bind(trigger, (e, kcmbo) => {
        fn();
        return false; //prevent default (ie. prevent the keycombo from triggering other browser or webpage shortcuts)
    });
}
