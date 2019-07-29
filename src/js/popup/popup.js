import { registerKeyboardShortcut } from '../common';
import { BrowserActions } from './BrowserActions';
import { loadOptions } from '../utils';

(async function main() {
    //register the keyboard shortcuts
    const keyboardShortcuts = (await loadOptions()).keyboard_shortcuts;
    keyboardShortcuts.forEach(({ keyCombo, fnName, args = [] }) => {
        registerKeyboardShortcut(keyCombo, async () => {
            await BrowserActions[fnName](...args);
            window.close();
        });
    });
})();
