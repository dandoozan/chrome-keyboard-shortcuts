export function registerKeyboardShortcut(trigger, fn) {
  require('mousetrap').bind(trigger, (e, kcmbo) => {
    fn();
    return false; //prevent default (ie. prevent the keycombo from triggering other browser or webpage shortcuts)
  });
}
