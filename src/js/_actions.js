import * as u from './utils';

export async function closeTabsToTheRight() {
    const currentTab = await u.getCurrentTab();
    const currentTabIndex = currentTab.index;
    const tabs = await u.getAllTabs();
    tabs.forEach(async (tab, index) => {
        if (tab.index > currentTabIndex) {
            await u.closeTab(tab);
        }
    });
}
export async function closeTabsToTheLeft() {
    const currentTab = await u.getCurrentTab();
    const currentTabIndex = currentTab.index;
    const tabs = await u.getAllTabs();
    tabs.forEach(async tab => {
        if (tab.index < currentTabIndex) {
            await u.closeTab(tab);
        }
    });
}

export async function moveTabsToNewWindow(tabs) {
    //if no tabs are passed in, get the currently selected tabs
    const [firstTab, ...restOfTabs] = tabs || (await u.getAllSelectedTabs());

    //first, create the window from the first tab (bc you can't create a
    //window with multiple tabs)
    const window = await u.moveTabToNewWindow(firstTab);

    //then, move the rest of the tabs over to the new window
    if (restOfTabs.length > 0) {
        await u.moveTabsToWindow(restOfTabs, window);
    }
    return window;
}
export async function moveTabsToNewWindowOnTheRight(tabs) {
    //if no tabs are passed in, get the currently selected tabs
    const [firstTab, ...restOfTabs] = tabs || (await u.getAllSelectedTabs());

    //first, create the window from the first tab (bc you can't create a
    //window with multiple tabs)
    const window = await u.moveTabToNewWindowOnTheRight(firstTab);

    //then, move the rest of the tabs over to the new window
    if (restOfTabs.length > 0) {
        await u.moveTabsToWindow(restOfTabs, window);
    }
    return window;
}

async function splitFullscreenWindowToRight(window) {
    await u.setFullscreenOff(window);
    await u.moveWindowToLeftSide(window);

    const selectedTabs = await u.getAllSelectedTabs();
    await moveTabsToNewWindowOnTheRight(selectedTabs);
}

export async function moveTabsToRightSide() {
    const currentWindow = await u.getCurrentWindow();

    //if the current window is fullscreen, handle this special case by splitting
    //it and moving the selected tabs to the right side
    if (await u.isWindowFullscreen(currentWindow)) {
        splitFullscreenWindowToRight(currentWindow);
    } else {
        const selectedTabs = await u.getAllSelectedTabs();

        //if there is already a half-size window on the right side, move the
        //selected tabs to that window
        const windowsOnRightSide = await u.getWindowsOnRightSideOfScreen();
        if (windowsOnRightSide.length > 0) {
            //move the tabs to the first window on the right--this may not be
            //what i want, but i think it will work for most cases.  If i run
            //into an issue where this doesn't work, then try to come up with a
            //way of knowing which window to move it to (maybe by most recent
            //focused of something)
            const firstWindowOnRightSide = windowsOnRightSide[0];
            u.moveTabsToWindow(selectedTabs, firstWindowOnRightSide);
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
        const tab = await u.getCurrentTab();
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
        const numTabs = (await u.getAllTabs()).length;
        const tab = await u.getCurrentTab();
        chrome.tabs.move(
            tab.id,
            {
                index: (tab.index + 1) % numTabs,
            },
            resolve
        );
    });
}

export async function createTab(url) {
    await u.createTab(url);
}
export async function duplicateTabs() {
    const tabs = await u.getAllSelectedTabs();
    const tabIds = tabs.map(tab => tab.id);

    for (let i = 0; i < tabIds.length; i++) {
        const tabId = tabIds[i];
        await u.duplicateTab(tabId);
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
