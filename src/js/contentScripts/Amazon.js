import { Page } from './_Page';

export default class Amazon extends Page {
  static focusSearchBar() {
    let searchInput = document.querySelector('#twotabsearchtextbox');
    if (searchInput) {
      searchInput.focus();
    }
  }

  static clickNext() {
    let nextButton = document.querySelector('.next-button');
    if (nextButton) {
      nextButton.click();
    }
  }
  static clickPrevious() {
    let backButton = document.querySelector('.back-button');
    if (backButton) {
      backButton.click();
    }
  }
}
