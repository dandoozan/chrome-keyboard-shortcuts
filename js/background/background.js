const BACKGROUND_FUNCTIONS = {
    closeTabsToTheRight() {
        console.log('woot');
        u.getCurrentTab((currentTab) => {
            console.log('​closeTabsToTheRight -> currentTab=', currentTab);
            const currentTabIndex = currentTab.index;
            u.getAllTabs((tabs) => {
                console.log('​closeTabsToTheRight -> tabs=', tabs);
                const tabsToClose = [];
                tabs.forEach((tab, index) => {
                    if (tab.index > currentTabIndex) {
                        tabsToClose.push(tab);
                    }
                });
                u.closeTabs(tabsToClose);
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