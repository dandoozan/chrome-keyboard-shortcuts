import { add } from './_KeyboardShortcuts';
import './_init';

add('t+e', 'closeTabsToTheRight', () => sendToBackground('closeTabsToTheRight'));
add('t+q', 'closeTabsToTheLeft', () => sendToBackground('closeTabsToTheLeft'));
add('t+p', 'moveTabToNewWindow', () => sendToBackground('moveTabToNewWindow'));
add('t+,', 'moveTabLeft', () => sendToBackground('moveTabLeft'));
add('t+.', 'moveTabRight', () => sendToBackground('moveTabRight'));


function sendToBackground(fnName, params) {
    chrome.runtime.sendMessage({ action: fnName, params: params }, (response) => {
        //do nothing
    });
}