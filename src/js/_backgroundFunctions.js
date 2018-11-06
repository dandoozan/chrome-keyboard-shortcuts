import { background as b } from '../../../_CommonChromeExtensions';

export async function closeTabsToTheRight() {
    const currentTab = await b.getCurrentTab();
    const currentTabIndex = currentTab.index;
    const tabs = await b.getAllTabs();
    tabs.forEach(async (tab, index) => {
        if (tab.index > currentTabIndex) {
            await b.closeTab(tab);
        }
    });
}
export async function closeTabsToTheLeft() {
    const currentTab = await b.getCurrentTab();
    const currentTabIndex = currentTab.index;
    const tabs = await b.getAllTabs();
    tabs.forEach(async (tab) => {
        if (tab.index < currentTabIndex) {
            await b.closeTab(tab);
        }
    });
}

export async function moveTabsToNewWindow() {
    const [firstTab, ...restOfTabs] = await b.getAllSelectedTabs();

    //first, create the window from the first tab (bc you can't create a
    //window with multiple tabs)
    const window = await b.moveTabToNewWindow(firstTab);

    //then, move the rest of the tabs over to the new window
    if (restOfTabs.length > 0) {
        await b.moveTabsToExistingWindow(restOfTabs, window.id);
    }
    return window;
}

export async function moveTabsToRightSide() {
    const currentWindow = await b.getCurrentWindow();
    await b.setFullscreenOff(currentWindow);
    await b.moveWindowToLeftSide(currentWindow);

    const newWindow = await moveTabsToNewWindow();
    await b.moveWindowToRightSide(newWindow);
}
export async function moveTabsToLeftSide() {
    const currentWindow = await b.getCurrentWindow();
    await b.setFullscreenOff(currentWindow);
    await b.moveWindowToRightSide(currentWindow);

    const newWindow = await moveTabsToNewWindow();
    await b.moveWindowToLeftSide(newWindow);
}

export async function moveTabLeft() {
    const tab = await b.getCurrentTab();
    chrome.tabs.move(tab.id, {
        index: tab.index - 1
    });
}
export async function moveTabRight() {
    const tab = await b.getCurrentTab();
    chrome.tabs.move(tab.id, {
        index: tab.index + 1
    });
}