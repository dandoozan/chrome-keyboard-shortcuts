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
    tabs.forEach(async tab => {
        if (tab.index < currentTabIndex) {
            await b.closeTab(tab);
        }
    });
}

export async function moveTabsToNewWindow(tabs) {
    //if no tabs are passed in, get the currently selected tabs
    const [firstTab, ...restOfTabs] = tabs || (await b.getAllSelectedTabs());

    //first, create the window from the first tab (bc you can't create a
    //window with multiple tabs)
    const window = await b.moveTabToNewWindow(firstTab);

    //then, move the rest of the tabs over to the new window
    if (restOfTabs.length > 0) {
        await b.moveTabsToWindow(restOfTabs, window);
    }
    return window;
}
export async function moveTabsToNewWindowOnTheRight(tabs) {
    //if no tabs are passed in, get the currently selected tabs
    const [firstTab, ...restOfTabs] = tabs || (await b.getAllSelectedTabs());

    //first, create the window from the first tab (bc you can't create a
    //window with multiple tabs)
    const window = await b.moveTabToNewWindowOnTheRight(firstTab);

    //then, move the rest of the tabs over to the new window
    if (restOfTabs.length > 0) {
        await b.moveTabsToWindow(restOfTabs, window);
    }
    return window;
}

async function splitFullscreenWindowToRight(window) {
    await b.setFullscreenOff(window);
    await b.moveWindowToLeftSide(window);

    const selectedTabs = await b.getAllSelectedTabs();
    await moveTabsToNewWindowOnTheRight(selectedTabs);
}

export async function moveTabsToRightSide() {
    const currentWindow = await b.getCurrentWindow();

    //if the current window is fullscreen, handle this special case by splitting
    //it and moving the selected tabs to the right side
    if (await b.isWindowFullscreen(currentWindow)) {
        splitFullscreenWindowToRight(currentWindow);
    } else {
        const selectedTabs = await b.getAllSelectedTabs();

        //if there is already a half-size window on the right side, move the
        //selected tabs to that window
        const windowsOnRightSide = await b.getWindowsOnRightSideOfScreen();
        if (windowsOnRightSide.length > 0) {
            //move the tabs to the first window on the right--this may not be
            //what i want, but i think it will work for most cases.  If i run
            //into an issue where this doesn't work, then try to come up with a
            //way of knowing which window to move it to (maybe by most recent
            //focused of something)
            const firstWindowOnRightSide = windowsOnRightSide[0];
            b.moveTabsToWindow(selectedTabs, firstWindowOnRightSide);
        } else {
            //otherwise, create a half-size window on the right and move the selected tabs there
            await moveTabsToNewWindowOnTheRight(selectedTabs);
        }
    }
}
export async function moveTabsToLeftSide() {
    //todo: fill this in
}

export function moveTabLeft() {
    return new Promise(async (resolve, reject) => {
        const tab = await b.getCurrentTab();
        chrome.tabs.move(
            tab.id,
            {
                index: tab.index - 1,
            },
            resolve
        );
    });
}
export function moveTabRight() {
    return new Promise(async (resolve, reject) => {
        const tab = await b.getCurrentTab();
        chrome.tabs.move(
            tab.id,
            {
                index: tab.index + 1,
            },
            resolve
        );
    });
}

export async function createTab(url) {
    await b.createTab(url);
}
export async function duplicateTabs() {
    const tabs = await b.getAllSelectedTabs();
    const tabIds = tabs.map(tab => tab.id);

    for (let i = 0; i < tabIds.length; i++) {
        const tabId = tabIds[i];
        await b.duplicateTab(tabId);
    }
}

export function reloadExtension(extensionId) {
    if (extensionId === 'me') {
        //reload myself
        chrome.runtime.reload();
    } else {
        //send a msg to the other extension to reload themselves
        //todo: put the magic string "dpd_reloadExtension" in the manifest file
        chrome.runtime.sendMessage(extensionId, { msg: 'dpd_reloadExtension' });
    }
}
