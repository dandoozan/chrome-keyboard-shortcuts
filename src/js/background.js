import { getCurrentTab, getAllTabs, closeTab, getAllSelectedTabs, createNewWindow } from '../../../_CommonChromeExtensions/background_utils';
import '../../../_CommonChromeExtensions/background_listenForReload';

const BACKGROUND_FUNCTIONS = {
    closeTabsToTheRight() {
        getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            getAllTabs((tabs) => {
                tabs.forEach((tab, index) => {
                    if (tab.index > currentTabIndex) {
                        closeTab(tab);
                    }
                });
            });
        });
    },
    closeTabsToTheLeft() {
        getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            getAllTabs((tabs) => {
                tabs.forEach((tab) => {
                    if (tab.index < currentTabIndex) {
                        closeTab(tab);
                    }
                });
            });
        });
    },

    moveTabToNewWindow() {
        getAllSelectedTabs((tabs) => {
            const tabIds = tabs.map((tab) => tab.id);
            createNewWindow((window) => {
                chrome.tabs.move(tabIds, window.id);
            });
        });
    },

    moveTabLeft() {
        getCurrentTab((tab) => {
            chrome.tabs.move(tab.id, {
                index: tab.index - 1
            });
        });
    },
    moveTabRight() {
        getCurrentTab((tab) => {
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