import { background as b } from '../../../_CommonChromeExtensions';
import * as backgroundFunctions from './_backgroundFunctions';

b.listenForReload();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.fnName) {
        backgroundFunctions[request.fnName](request.params);
    }
});