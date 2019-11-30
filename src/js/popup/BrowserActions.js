import {
  getCurrentWindow,
  getAllWindows,
  getCurrentTab,
  getAllTabs,
  getAllSelectedTabs,
  isWindowFullscreen,
  getScreenWidth,
  getScreenHeight,
  loadOptions,
} from '../helpers/chrome';

export class BrowserActions {
  static async closeTabsToTheRight() {
    let currentTabIndex = (await getCurrentTab()).index;
    let tabsToTheRight = (await getAllTabs()).filter(
      tab => tab.index > currentTabIndex
    );
    await closeTabs(tabsToTheRight);
  }
  static async closeTabsToTheLeft() {
    let currentTabIndex = (await getCurrentTab()).index;
    let tabsToTheLeft = (await getAllTabs()).filter(
      tab => tab.index < currentTabIndex
    );
    await closeTabs(tabsToTheLeft);
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
    return new Promise((resolve, reject) => {
      chrome.tabs.create({ url }, resolve);
    });
  }
  static async duplicateTabs() {
    const tabs = await getAllSelectedTabs();
    const tabIds = tabs.map(tab => tab.id);

    for (let i = 0; i < tabIds.length; i++) {
      await duplicateTab(tabIds[i]);
    }
  }

  static async reloadExtension(extensionName) {
    return new Promise((resolve, reject) => {
      if (extensionName === 'me') {
        //reload myself
        chrome.runtime.reload();
        resolve();
      } else {
        chrome.management.getAll(async extensions => {
          //find the id for this extension
          let [{ id }] = extensions.filter(
            ({ name }) => name === extensionName
          );

          //send a msg to the other extension to reload themselves
          chrome.runtime.sendMessage(
            id,
            {
              msg: (await loadOptions()).reload_extension_message,
            },
            null,
            resolve
          );
        });
      }
    });
  }
}

async function moveTabsToNewWindowOnTheRight(tabs) {
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

async function splitFullscreenWindowToRight(window) {
  await setFullscreenOff(window);
  await moveWindowToLeftSide(window);

  const selectedTabs = await getAllSelectedTabs();
  await moveTabsToNewWindowOnTheRight(selectedTabs);
}

function closeTabs(tabs) {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(
      tabs.map(tab => tab.id),
      resolve
    );
  });
}

function setFullscreenOff(window) {
  return new Promise((resolve, reject) => {
    chrome.windows.update(window.id, { state: 'normal' }, resolve);
  });
}

function duplicateTab(tabId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.duplicate(tabId, resolve);
  });
}

function createNewWindow(windowOptions) {
  return new Promise((resolve, reject) => {
    chrome.windows.create(windowOptions, window => {
      resolve(window);
    });
  });
}

async function getWindow(windowId) {
  return new Promise((resolve, reject) => {
    chrome.windows.get(windowId, resolve);
  });
}

async function moveTabToNewWindow({ id: tabId, windowId }) {
  //create a new window containing the tab passed in AND make it the same
  //size/position as the original window
  let { top, left, width, height } = await getWindow(windowId);
  return await createNewWindow({ tabId, top, left, width, height });
}
async function moveTabToNewWindowOnTheRight(tab) {
  return await createNewWindow({
    tabId: tab.id,
    left: (await getScreenWidth()) / 2,
    top: 0,
    width: (await getScreenWidth()) / 2,
    height: await getScreenHeight(),
  });
}

async function focusTab(tab) {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(tab.id, { active: true }, tab => resolve);
  });
}

function moveTabsToWindow(tabs, window) {
  return new Promise((resolve, reject) => {
    const tabIds = tabs.map(tab => tab.id);
    chrome.tabs.move(
      tabIds,
      { windowId: window.id, index: -1 },
      async tabOrTabs => {
        //focus the first tab (otherwise, they're unfocused)
        await focusTab(Array.isArray(tabOrTabs) ? tabOrTabs[0] : tabOrTabs);
        resolve(tabOrTabs);
      }
    );
  });
}

async function moveWindowToRightSide(window) {
  return new Promise(async (resolve, reject) => {
    const options = {
      left: (await getScreenWidth()) / 2,
      top: 0,
      width: (await getScreenWidth()) / 2,
      height: await getScreenHeight(),
    };
    chrome.windows.update(window.id, options, resolve);
  });
}

async function moveWindowToLeftSide(window) {
  return new Promise(async (resolve, reject) => {
    const options = {
      left: 0,
      top: 0,
      width: (await getScreenWidth()) / 2,
      height: await getScreenHeight(),
    };
    chrome.windows.update(window.id, options, resolve);
  });
}

async function isWindowHalfScreenSize(window) {
  return (
    window.width === (await getScreenWidth()) / 2 &&
    window.height === (await getScreenHeight())
  );
}
async function isWindowOnRightSideOfScreen(window) {
  return (
    (await isWindowHalfScreenSize(window)) &&
    window.left === (await getScreenWidth()) / 2
  );
}

async function getWindowsOnRightSideOfScreen() {
  const windows = await getAllWindows();
  const windowsOnRightSideOfScreen = [];
  for (const window of windows) {
    if (await isWindowOnRightSideOfScreen(window)) {
      windowsOnRightSideOfScreen.push(window);
    }
  }
  return windowsOnRightSideOfScreen;
}
