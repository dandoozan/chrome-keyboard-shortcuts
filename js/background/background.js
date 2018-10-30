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
            //todo: redo this to use tabs.move api (so that I'm not reloading
            //all the tabs when i move them to a new window)
            u.closeTabs(tabs, () => {
                u.createNewWindowWithTabs(tabs);
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