import { sendMessageToBackground } from '../helpers/chrome';

export class Page {
  //put common code for all page scripts here
  static focusSearchBar() {
    let selectors = [
      //generics
      'input#search',
      'input[title="Search"]',
      'input[type="Search"]',
      'input[placeholder="Search"]',

      'input#twotabsearchtextbox', //amazon
      'input#global-search-input', //walmart
      'input#search-input', //harbor freight
    ];

    let searchInput;
    for (let i = 0; i < selectors.length; i++) {
      searchInput = document.querySelector(selectors[i]);
      if (searchInput) {
        break;
      }
    }
    if (searchInput) {
      searchInput.focus();
    }
  }

  static async searchOnYoutube() {
    let searchTerm = await sendMessageToBackground('getClipboardContents');
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchTerm
      )}`
    );
  }
}
