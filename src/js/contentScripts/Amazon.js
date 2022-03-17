import { Page } from './_Page';

export default class Amazon extends Page {
  static clickNext() {
    let nextButton =
      document.querySelector('.next-button') ||
      document.querySelector(
        '#crReviewRow .cr-lightbox-navigator-button__next'
      );
    if (nextButton) {
      nextButton.click();
    }
  }
  static clickPrevious() {
    let backButton =
      document.querySelector('.back-button') ||
      document.querySelector(
        '#crReviewRow .cr-lightbox-navigator-button__back'
      );
    if (backButton) {
      backButton.click();
    }
  }
}
