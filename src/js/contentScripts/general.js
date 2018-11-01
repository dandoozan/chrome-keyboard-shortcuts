const KS = require('../modules/KS');

KS.add('t+e', closeTabsToTheRight);
KS.add('t+q', () => sendToBackground('closeTabsToTheLeft'));
KS.add('t+p', moveTabToNewWindow);
KS.add('t+,', moveTabLeft);
KS.add('t+.', moveTabRight);


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