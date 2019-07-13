import { Page } from './_Page';

export default class Google extends Page {
    static openAllLinks() {
        console.log(`***openAllLinks`)
        // document.querySelectorAll('g-scrolling-carousel a').forEach(el => {
        //     window.open(el.href);
        // });
    }
};
