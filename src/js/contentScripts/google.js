//todo: remove dependence on jquery
import $ from 'jquery';
import { AbstractPageActions } from './AbstractPageActions';

//make this class global so that I can access it in "main"
window.PageActions = class extends AbstractPageActions {
    //todo: move this method to AbstractPageActions
    static openAllLinks() {
        console.log(`***openAllLinks google here2`);
        // $('g-scrolling-carousel a')
        //     .toArray()
        //     .forEach(el => {
        //         window.open($(el).attr('href'));
        //     });
    }
};
