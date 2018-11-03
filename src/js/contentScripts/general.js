import { add } from './_KeyboardShortcuts';
import './_init';

add('t+e', closeTabsToTheRight);
add('t+q', () => sendToBackground('closeTabsToTheLeft'));
add('t+p', moveTabToNewWindow);
add('t+,', moveTabLeft);
add('t+.', moveTabRight);


function sendToBackground(fnName, params) {
    chrome.runtime.sendMessage({
        action: fnName,
        params: params
    }, (response) => {
        //do nothing
    });
}

function closeTabsToTheRight() {
    console.log('closeTabsToTheRight');
    sendToBackground('closeTabsToTheRight');
}

function moveTabToNewWindow() {
    console.log('moveTabToNewWindow');
    sendToBackground('moveTabToNewWindow');
}

function moveTabLeft() {
    console.log('moveTabLeft');
    sendToBackground('moveTabLeft');
}

function moveTabRight() {
    console.log('moveTabRight');
    sendToBackground('moveTabRight');
}