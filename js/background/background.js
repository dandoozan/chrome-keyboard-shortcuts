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

    moveTabToNewWindow() {
        u.getAllSelectedTabs((tabs) => {
            u.closeTabs(tabs, () => {
                u.createNewWindowWithTabs(tabs);
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