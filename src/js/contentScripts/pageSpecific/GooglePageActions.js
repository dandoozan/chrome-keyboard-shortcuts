import { PageActions } from '../PageActions';

//set window.Actions to this class so that I can access it in the "main" file
export default class GooglePageActions extends PageActions {
    static openAllLinks() {
        console.log(`***openAllLinks`)
        // document.querySelectorAll('g-scrolling-carousel a').forEach(el => {
        //     window.open(el.href);
        // });
    }
};
