//todo: remove dependence on jquery
import $ from 'jquery';
import { PageActions } from '../PageActions';

//make this class global so that I can access it in the "main" file
window.Actions = class GooglePageActions extends PageActions {
    //todo: move this method to PageActions
    static openAllLinks() {
        console.log(`***openAllLinks google here2`);
        // $('g-scrolling-carousel a')
        //     .toArray()
        //     .forEach(el => {
        //         window.open($(el).attr('href'));
        //     });
    }
};
