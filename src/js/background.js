import { background as b } from '../../../_CommonChromeExtensions';
import * as actions from './_actions';

//add the alt-r reload extension capability
b.listenForReload();

//listen for msgs from content scripts that will be sending a msg so that i run
//an action from the background page context
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.fnName) {
        actions[request.fnName](request.params);
    }
});