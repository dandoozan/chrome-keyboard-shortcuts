chrome.runtime.onMessage.addListener(({ message }, sender, sendResponse) => {
  //This code is based on: https://stackoverflow.com/questions/22702446/how-to-get-clipboard-data-in-chrome-extension
  //Essentially, to get the clipboard contents, we need to create an input field, paste into that, then get the contents of that
  if (message === 'getClipboardContents') {
    var t = document.createElement('input');
    document.body.appendChild(t);
    t.focus();
    document.execCommand('paste');
    var clipboardText = t.value; //this is your clipboard data
    document.body.removeChild(t);

    sendResponse(clipboardText);

    return true;
  }
});
