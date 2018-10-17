
//todo: add a flag to indicate that it should send to background so I
//dont have to create a function below that send it to the background
KS.add('command+alt+.', closeTabsToTheRight);
// KS.add('cmd+c', copyOrCopyUrlOfPageIfNoTextIsSelected);
// KS.add('?', moveTabLeft);
// KS.add('?', moveTabRight);
// KS.add('?', moveTabToFirstPosition);


function sendToBackground(fnName, params) {
    chrome.runtime.sendMessage({ action: fnName, params: params }, (response) => {
        //do nothing
    });
}

function closeTabsToTheRight() {
    console.log('closeTabsToTheRight');
    sendToBackground('closeTabsToTheRight');
}