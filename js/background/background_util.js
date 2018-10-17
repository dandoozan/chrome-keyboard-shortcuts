//todo: make this a module, and start compiling my chrome extension already
var u = {
    getCurrentTab(cb) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            cb(tabs[0]);
        });
    },
    getAllTabs(cb) {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            cb(tabs);
        });
    },
    closeTab(tab) {
        chrome.tabs.remove(tab.id);
    },
    closeTabs(tabs) {
        chrome.tabs.remove(tabs.map((tab) => tab.id));
    }
}