import { Page } from './_Page';

export default class Google extends Page {
  static openAllLinks() {
    console.log(`***openAllLinks`);
    // document.querySelectorAll('g-scrolling-carousel a').forEach(el => {
    //     window.open(el.href);
    // });
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
