import { registerKeyboardShortcut, fetchConfig } from '../common';
import { BrowserActions } from './BrowserActions';

(function main() {
    //register the keyboard shortcuts
    const keyboardShortcuts = fetchConfig().keyboard_shortcuts
        .browser;
    keyboardShortcuts.forEach(({ keyCombo, fnName, args = [] }) => {
        registerKeyboardShortcut(keyCombo, async () => {
            await BrowserActions[fnName](...args);
            window.close();
        });
    });
})();
