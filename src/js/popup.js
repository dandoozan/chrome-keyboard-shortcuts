import Mousetrap from 'mousetrap';
import * as actions from './_actions';

function getKeyboardShortcuts() {
    //todo: move these to the manifest or some other config location
    return [
        { keyCombo: ',', fnName: 'moveTabLeft', },
        { keyCombo: '.', fnName: 'moveTabRight', },
        { keyCombo: 'right', fnName: 'moveTabsToRightSide', },
        { keyCombo: 'left', fnName: 'moveTabsToLeftSide', },
        { keyCombo: 'e', fnName: 'closeTabsToTheRight', },
        { keyCombo: 'q', fnName: 'closeTabsToTheLeft', },
        { keyCombo: 'p', fnName: 'moveTabsToNewWindow', },
        { keyCombo: '=', fnName: 'duplicateTabs', },
    ];
}

function sendToBackground(ksObj) {
    chrome.runtime.sendMessage(ksObj, (response) => {
        //do nothing
    });
}

function registerKeyboardShortcut(ksObj) {
    const keyCombo = ksObj.keyCombo;
    Mousetrap.bind(keyCombo, async (e, kcmbo) => {
        sendToBackground(ksObj);
        window.close();
        return false;
    });
}

//---------- Main ----------

//register the keyboard shortcuts
const keyboardShortcuts = getKeyboardShortcuts();
for (const ksObj of keyboardShortcuts) {
    registerKeyboardShortcut(ksObj);
}


















// import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/popup.css';

// const SELECTORS = {
//     KEYBOARD_SHORTCUTS_TABLE: '#keyboardShortcutsTable',
// }

// window.onload = function () {
//     chrome.tabs.getSelected(function (tab) {
//         chrome.tabs.sendMessage(tab.id, {
//             req: 'getKeyboardShortcuts',
//             url: tab.url
//         }, function (data) {
//             console.log('​window.onload -> data=', data);
//             //display the data
//             displayPage(data);
//         });
//     });
// }

// Mousetrap.bind('g', (e, kcmbo) => {
//     chrome.runtime.sendMessage({ fnName: 'moveTabRight' }, (response) => {
//         //do nothing
//     });
//     return false; //prevent default (from the docs: "Returning false here works the same way as jQuery's return false. It prevents the default action and stops the event from bubbling up.")
// });

// function getTBody() {
//     return $(`${SELECTORS.KEYBOARD_SHORTCUTS_TABLE} tbody`);
// }

// function addKeyboardShortcutToPage(keyboardShortcut) {

//     const { keyCombo, actionName } = keyboardShortcut;

//     const tbody = $(getTBody());

//     const keyComboTd = $('<td>').text(keyCombo);
//     const actionTd = $('<td>').text(actionName);

//     const tr = $('<tr>');
//     tr.append(keyComboTd);
//     tr.append(actionTd);
//     tbody.append(tr);
// }

// function displayPage(keyboardShortcuts) {
//     for (const keyboardShortcut of keyboardShortcuts) {
//         addKeyboardShortcutToPage(keyboardShortcut);
//     }
// }

