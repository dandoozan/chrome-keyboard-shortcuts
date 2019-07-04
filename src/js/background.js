import * as actions from './_actions';

//listen for msgs from content scripts that will be sending a msg so that i run
//an action from the background page context
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.fnName) {
        actions[request.fnName](...(request.args || []))
    }
});