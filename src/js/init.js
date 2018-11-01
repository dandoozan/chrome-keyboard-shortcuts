// console.log('dpd here');
const Mousetrap = require('mousetrap');
const KS = require('./modules/KS');

//override the "stopCallback" function so that the keyboard shortcuts work in
//input fields
Mousetrap.stopCallback = function (e, element, combo) {
    //just return false to make sure it never stops the callback (ie. all
    //keyboard shortcuts go through all the time)
    return false;

    //Note: below is the default implementation (gotten from: https://craig.is/killing/mice)
    /*
    //if the element has the class "mousetrap" then no need to stop
    if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
        return false;
    }

    // stop for input, select, and textarea
    return element.tagName == 'INPUT' || element.tagName == 'SELECT' ||
    element.tagName == 'TEXTAREA' || (element.contentEditable &&
    element.contentEditable == 'true');
    */
}

//add listener from popup
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.req === 'getKeyboardShortcuts') {
        const data = KS.getKeyboardShortcuts();
        console.log('​data=', data);
        sendResponse(data);
    }
});