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
    getAllSelectedTabs(cb) {
        chrome.tabs.query({ currentWindow: true, highlighted: true }, (tabs) => {
            cb(tabs);
        });
    },
    closeTab(tab, cb) {
        chrome.tabs.remove(tab.id, cb);
    },
    closeTabs(tabs, cb) {
        chrome.tabs.remove(tabs.map((tab) => tab.id), cb);
    },
    createNewWindowWithTabs(tabs, cb) {
        const tabUrls = tabs.map((tab) => tab.url);
        chrome.windows.create({ url: tabUrls }, cb);
    },
}