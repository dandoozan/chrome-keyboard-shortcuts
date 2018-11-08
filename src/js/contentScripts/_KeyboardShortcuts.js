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

function displayNotification(notifier, keyCombo) {
    notifier.info(`<span style="font-family: sans-serif; font-size: 16px">Keyboard Shortcut: <span style="font-weight: bold; background-color: #c6e9fc; padding: 5px 15px; border-radius: 5px; font-size: 20px; letter-spacing: 5px; border: 1px solid; margin: 5px">${keyCombo}</span></span>`);
}
export function add(keyCombo, actionName, fn, ...params) {
    //register keyboard shortcut with Mousetrap
    const Mousetrap = require('mousetrap');
    Mousetrap.bind(keyCombo, (e, kcmbo) => {
        displayNotification(notifier, keyCombo.replace(/\+/g, '-'));
        fn(...params);
        return false; //prevent default (from the docs: "Returning false here works the same way as jQuery's return false. It prevents the default action and stops the event from bubbling up.")
    });
    //add it to my list of keyboard shortcuts
    addToKeyboardShortcutsArray(keyCombo, actionName);
}


//init awesome-notifications
import AwesomeNotifications from 'awesome-notifications'
import '../../../node_modules/awesome-notifications/dist/style.css';
const notifier = new AwesomeNotifications({
    icons: { enabled: false }, //add this bc I'm not using font-awesome icons
    duration: 3000,
    labels: {
        info: ''
    },
});