//todo: remove dependence on jquery
import $ from 'jquery';
import { PageActions } from '../PageActions';

function removeTrailingSlashIfNecessary(url) {
    if (url[url.length - 1] === '/') {
        url = url.substring(0, url.length - 1);
    }
    return url;
}

window.Actions = class ConsumerReportsPageActions extends PageActions {
    //todo: move this method to PageActions
    static openAllLinks() {
        console.log(`***openAllLinks consumerreports here`);
        // let windowHref = removeTrailingSlashIfNecessary(window.location.href);

        // //get the current year
        // let currYear = $(
        //     $('div.crux-section-header.generation-range__header')[0]
        // )
        //     .text()
        //     .trim();

        // //get all past years
        // let pastYears = $('.year-details__row:visible')
        //     .toArray()
        //     .map(el => $(el).attr('data-year'));

        // let allYears = [currYear, ...pastYears];

        // //generate and open links for all years
        // allYears.forEach(year => {
        //     window.open(`${windowHref}/${year}`);
        // });
    }
};
