const u = require('../../../../_CommonChromeExtensions/background_utils');
// import '../../../_CommonChromeExtensions/background_listenForReload';

const BACKGROUND_FUNCTIONS = {
    closeTabsToTheRight() {
        u.getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            u.getAllTabs((tabs) => {
                tabs.forEach((tab, index) => {
                    if (tab.index > currentTabIndex) {
                        u.closeTab(tab);
                    }
                });
            });
        });
    },
    closeTabsToTheLeft() {
        u.getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            u.getAllTabs((tabs) => {
                tabs.forEach((tab) => {
                    if (tab.index < currentTabIndex) {
                        u.closeTab(tab);
                    }
                });
            });
        });
    },

    moveTabToNewWindow() {
        u.getAllSelectedTabs((tabs) => {
            const tabIds = tabs.map((tab) => tab.id);
            u.createNewWindow((window) => {
                chrome.tabs.move(tabIds, window.id);
            });
        });
    },

    moveTabLeft() {
        u.getCurrentTab((tab) => {
            chrome.tabs.move(tab.id, {
                index: tab.index - 1
            });
        });
    },
    moveTabRight() {
        u.getCurrentTab((tab) => {
            chrome.tabs.move(tab.id, {
                index: tab.index + 1
            });
        });
    }
};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('​request=', request);
    if (request.action) {
        BACKGROUND_FUNCTIONS[request.action](request.params);
    }
});