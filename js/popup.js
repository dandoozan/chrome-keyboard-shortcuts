const SELECTORS = {
    KEYBOARD_SHORTCUTS_TABLE: '#keyboardShortcutsTable',
}

window.onload = function () {
    chrome.tabs.getSelected(function (tab) {
        chrome.tabs.sendMessage(tab.id, {
            req: 'getKeyboardShortcuts',
            url: tab.url
        }, function (data) {
            console.log('​window.onload -> data=', data);
            //display the data
            displayPage(data);
        });
    });
}

function getTBody() {
    return $(`${SELECTORS.KEYBOARD_SHORTCUTS_TABLE} tbody`);
}

function addKeyboardShortcutToPage(keyCombo, action) {
    const tbody = $(getTBody());

    const keyComboTd = $('<td>').text(keyCombo);
    const actionTd = $('<td>').text(action);

    const tr = $('<tr>');
    tr.append(keyComboTd);
    tr.append(actionTd);
    tbody.append(tr);
}

function displayPage(data) {
    for (const keyCombo in data) {
        if (data.hasOwnProperty(keyCombo)) {
            const action = data[keyCombo];
            addKeyboardShortcutToPage(keyCombo, action);
        }
    }
}