import { Page } from './_Page';

export default class DuckDuckGo extends Page {
  static async searchOnGoogle() {
    //This searches on Google images if I'm on the images page on DuckDuckGo, else it search the web
    let searchParams = new URL(window.location.href).searchParams;
    let searchTerm = searchParams.get('q');
    let isImages = searchParams.get('ia') === 'images';
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}${
        isImages ? '&tbm=isch' : ''
      }`
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
