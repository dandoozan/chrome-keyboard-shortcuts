import { Page } from './_Page';

export default class DuckDuckGo extends Page {
  static async searchOnGoogle() {
    let searchTerm = new URL(window.location.href).searchParams.get('q');
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`
    );
  }
  static async searchOnYoutube() {
    let searchTerm = new URL(window.location.href).searchParams.get('q');
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchTerm
      )}`
    );
  }
}
