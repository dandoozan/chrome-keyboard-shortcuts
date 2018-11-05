import { background as b } from '../../../_CommonChromeExtensions';

export function closeTabsToTheRight() {
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
}
export function closeTabsToTheLeft() {
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
}

export function moveTabsToNewWindow() {
    b.getAllSelectedTabs((tabs) => {
        const [firstTab, ...restOfTabs] = tabs;
        //first, create the window from the first tab (bc you can't create a
        //window with multiple tabs)
        b.moveTabToNewWindow(firstTab, (window) => {
            //then, move the rest of the tabs over to the new window
            b.moveTabsToExistingWindow(restOfTabs, window.id);
        });
    });
}

export function moveTabLeft() {
    b.getCurrentTab((tab) => {
        chrome.tabs.move(tab.id, {
            index: tab.index - 1
        });
    });
}
export function moveTabRight() {
    b.getCurrentTab((tab) => {
        chrome.tabs.move(tab.id, {
            index: tab.index + 1
        });
    });
}