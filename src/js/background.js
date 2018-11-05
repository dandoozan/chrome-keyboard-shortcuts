import {
    background as b
} from '../../../_CommonChromeExtensions';

b.listenForReload();

const BACKGROUND_FUNCTIONS = {
    closeTabsToTheRight() {
        b.getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            b.getAllTabs((tabs) => {
                tabs.forEach((tab, index) => {
                    if (tab.index > currentTabIndex) {
                        b.closeTab(tab);
                    }
                });
            });
        });
    },
    closeTabsToTheLeft() {
        b.getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            b.getAllTabs((tabs) => {
                tabs.forEach((tab) => {
                    if (tab.index < currentTabIndex) {
                        b.closeTab(tab);
                    }
                });
            });
        });
    },

    //I believe this is broken, so fix it next time I run into needing this functionality
    // moveTabToNewWindow() {
    //     bu.getAllSelectedTabs((tabs) => {
    //         const tabIds = tabs.map((tab) => tab.id);
    //         bu.createNewWindow((window) => {
    //             chrome.tabs.move(tabIds, window.id);
    //         });
    //     });
    // },

    moveTabLeft() {
        b.getCurrentTab((tab) => {
            chrome.tabs.move(tab.id, {
                index: tab.index - 1
            });
        });
    },
    moveTabRight() {
        b.getCurrentTab((tab) => {
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