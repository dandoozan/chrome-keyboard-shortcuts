import {
    getCurrentTab,
    getCurrentWindow,
    getAllTabs,
    closeTab,
    getAllSelectedTabs,
    moveTabToNewWindow,
    moveTabsToWindow,
    getWindowsOnRightSideOfScreen,
    moveTabToNewWindowOnTheRight,
    isWindowFullscreen,
    setFullscreenOff,
    moveWindowToLeftSide,
    duplicateTab,
    createTab,
} from './utils';

export class BrowserActions {
    static async closeTabsToTheRight() {
        const currentTab = await getCurrentTab();
        const currentTabIndex = currentTab.index;
        const tabs = await getAllTabs();
        tabs.forEach(async (tab, index) => {
            if (tab.index > currentTabIndex) {
                await closeTab(tab);
            }
        });
    }
    static async closeTabsToTheLeft() {
        const currentTab = await getCurrentTab();
        const currentTabIndex = currentTab.index;
        const tabs = await getAllTabs();
        tabs.forEach(async tab => {
            if (tab.index < currentTabIndex) {
                await closeTab(tab);
            }
        });
    }

    static async moveTabsToNewWindow(tabs) {
        //if no tabs are passed in, get the currently selected tabs
        const [firstTab, ...restOfTabs] = tabs || (await getAllSelectedTabs());

        //first, create the window from the first tab (bc you can't create a
        //window with multiple tabs)
        const window = await moveTabToNewWindow(firstTab);

        //then, move the rest of the tabs over to the new window
        if (restOfTabs.length > 0) {
            await moveTabsToWindow(restOfTabs, window);
        }
        return window;
    }
    static async moveTabsToNewWindowOnTheRight(tabs) {
        //if no tabs are passed in, get the currently selected tabs
        const [firstTab, ...restOfTabs] = tabs || (await getAllSelectedTabs());

        //first, create the window from the first tab (bc you can't create a
        //window with multiple tabs)
        const window = await moveTabToNewWindowOnTheRight(firstTab);

        //then, move the rest of the tabs over to the new window
        if (restOfTabs.length > 0) {
            await moveTabsToWindow(restOfTabs, window);
        }
        return window;
    }

    static async splitFullscreenWindowToRight(window) {
        await setFullscreenOff(window);
        await moveWindowToLeftSide(window);

        const selectedTabs = await getAllSelectedTabs();
        await moveTabsToNewWindowOnTheRight(selectedTabs);
    }

    static async moveTabsToRightSide() {
        const currentWindow = await getCurrentWindow();

        //if the current window is fullscreen, handle this special case by splitting
        //it and moving the selected tabs to the right side
        if (await isWindowFullscreen(currentWindow)) {
            splitFullscreenWindowToRight(currentWindow);
        } else {
            const selectedTabs = await getAllSelectedTabs();

            //if there is already a half-size window on the right side, move the
            //selected tabs to that window
            const windowsOnRightSide = await getWindowsOnRightSideOfScreen();
            if (windowsOnRightSide.length > 0) {
                //move the tabs to the first window on the right--this may not be
                //what i want, but i think it will work for most cases.  If i run
                //into an issue where this doesn't work, then try to come up with a
                //way of knowing which window to move it to (maybe by most recent
                //focused of something)
                const firstWindowOnRightSide = windowsOnRightSide[0];
                moveTabsToWindow(selectedTabs, firstWindowOnRightSide);
            } else {
                //otherwise, create a half-size window on the right and move the selected tabs there
                await moveTabsToNewWindowOnTheRight(selectedTabs);
            }
        }
    }
    static async moveTabsToLeftSide() {
        //todo: fill this in
    }

    static moveTabLeft() {
        return new Promise(async (resolve, reject) => {
            const tab = await getCurrentTab();
            chrome.tabs.move(
                tab.id,
                {
                    index: tab.index - 1,
                },
                resolve
            );
        });
    }
    static moveTabRight() {
        return new Promise(async (resolve, reject) => {
            const numTabs = (await getAllTabs()).length;
            const tab = await getCurrentTab();
            chrome.tabs.move(
                tab.id,
                {
                    index: (tab.index + 1) % numTabs,
                },
                resolve
            );
        });
    }

    static async createTab(url) {
        await createTab(url);
    }
    static async duplicateTabs() {
        const tabs = await getAllSelectedTabs();
        const tabIds = tabs.map(tab => tab.id);

        for (let i = 0; i < tabIds.length; i++) {
            const tabId = tabIds[i];
            await duplicateTab(tabId);
        }
    }

    static reloadExtension(extensionId) {
        if (extensionId === 'me') {
            //reload myself
            chrome.runtime.reload();
        } else {
            //send a msg to the other extension to reload themselves
            //todo: put the magic string "dpd_reloadExtension" in the manifest file
            chrome.runtime.sendMessage(extensionId, {
                msg: 'dpd_reloadExtension',
            });
        }
    }
}
