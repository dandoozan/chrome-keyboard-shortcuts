import { Page } from './_Page';

export default class Amazon extends Page {
  static focusSearchBar() {
    document.getElementById('twotabsearchtextbox').focus();
  }
}
