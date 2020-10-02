import { Page } from './_Page';

export default class HarborFreight extends Page {
  static focusSearchBar() {
    let searchInput = document.querySelector('#search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
}
