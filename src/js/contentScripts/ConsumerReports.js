//todo: remove dependence on jquery
import $ from 'jquery';
import { Page } from './_Page';

function removeTrailingSlashIfNecessary(url) {
    if (url[url.length - 1] === '/') {
        url = url.substring(0, url.length - 1);
    }
    return url;
}

export default class ConsumerReports extends Page {
    static openAllLinks() {
        let windowHref = removeTrailingSlashIfNecessary(window.location.href);

        //get the current year
        let currYear = $(
            $('div.crux-section-header.generation-range__header')[0]
        )
            .text()
            .trim();

        //get all past years
        let pastYears = $('.year-details__row:visible')
            .toArray()
            .map(el => $(el).attr('data-year'));

        let allYears = [currYear, ...pastYears];

        //generate and open links for all years
        allYears.forEach(year => {
            window.open(`${windowHref}/${year}`);
        });
    }
};
