import { add } from './_KeyboardShortcuts';
import './_init';

add('t+e', 'closeTabsToTheRight', () => sendToBackground('closeTabsToTheRight'));
add('t+q', 'closeTabsToTheLeft', () => sendToBackground('closeTabsToTheLeft'));
add('t+p', 'moveTabsToNewWindow', () => sendToBackground('moveTabsToNewWindow'));
add('t+,', 'moveTabLeft', () => sendToBackground('moveTabLeft'));
add('t+.', 'moveTabRight', () => sendToBackground('moveTabRight'));


function sendToBackground(fnName, params) {
    chrome.runtime.sendMessage({ fnName, params }, (response) => {
        //do nothing
    });
}