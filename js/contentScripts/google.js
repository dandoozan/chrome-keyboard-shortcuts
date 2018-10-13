// console.log('dpd3 here');

//define keyboard shortcuts up here
const KEYBOARD_SHORTCUTS = {
    'alt+enter': { fn: openAllLinks, params: [] },
};

function openAllLinks() {
    $('a.klitem').toArray().forEach((el) => {
        window.open($(el).attr('href'))
    });
}

function getActionFromActionObj(actionObj) {
    return actionObj.fn.name;
}

function getKeyComboToActionMapping() {
    const keyComboToActionMapping = {};

    for (const keyCombo in KEYBOARD_SHORTCUTS) {
        if (KEYBOARD_SHORTCUTS.hasOwnProperty(keyCombo)) {
            const actionObj = KEYBOARD_SHORTCUTS[keyCombo];
            const action = getActionFromActionObj(actionObj);
            keyComboToActionMapping[keyCombo] = action;
        }
    }

    return keyComboToActionMapping;;
}

//register all the keyboard shortcuts into Mousetrap
for (const keyCombo in KEYBOARD_SHORTCUTS) {
    if (KEYBOARD_SHORTCUTS.hasOwnProperty(keyCombo)) {
        const actionObj = KEYBOARD_SHORTCUTS[keyCombo];
        const fn = actionObj.fn;
        const params = actionObj.params;

        Mousetrap.bind(keyCombo, (e, kcmbo) => {
            fn(params);
            return false; //prevent default (from the docs: "Returning false here works the same way as jQuery's return false. It prevents the default action and stops the event from bubbling up.")
        });
    }
}

//add listener from popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.req === 'getKeyboardShortcuts'){
        const data = getKeyComboToActionMapping();
        sendResponse(data);
    }
});

