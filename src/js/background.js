import { backgroundUtils as bu } from '../../../_CommonChromeExtensions';
import '../../../_CommonChromeExtensions/background_listenForReload';

const BACKGROUND_FUNCTIONS = {
    closeTabsToTheRight() {
        bu.getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            bu.getAllTabs((tabs) => {
                tabs.forEach((tab, index) => {
                    if (tab.index > currentTabIndex) {
                        bu.closeTab(tab);
                    }
                });
            });
        });
    },
    closeTabsToTheLeft() {
        bu.getCurrentTab((currentTab) => {
            const currentTabIndex = currentTab.index;
            bu.getAllTabs((tabs) => {
                tabs.forEach((tab) => {
                    if (tab.index < currentTabIndex) {
                        bu.closeTab(tab);
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
        bu.getCurrentTab((tab) => {
            chrome.tabs.move(tab.id, {
                index: tab.index - 1
            });
        });
    },
    moveTabRight() {
        bu.getCurrentTab((tab) => {
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