import { Page } from './_Page';

export default class Walmart extends Page {
  static focusSearchBar() {
    let searchInput = document.querySelector('#global-search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
}
