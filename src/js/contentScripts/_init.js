// console.log('dpd here');
import Mousetrap from 'mousetrap';
import { getKeyboardShortcuts } from './_KeyboardShortcuts';


//override the "stopCallback" function so that the keyboard shortcuts work in
//input fields
Mousetrap.stopCallback = function (e, element, combo) {
    //just return false to make sure it never stops the callback (ie. all
    //keyboard shortcuts go through even when an input element is focused)
    return false;
}

//add listener from popup
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.req === 'getKeyboardShortcuts') {
        const data = getKeyboardShortcuts();
        console.log('​data=', data);
        sendResponse(data);
    }
});