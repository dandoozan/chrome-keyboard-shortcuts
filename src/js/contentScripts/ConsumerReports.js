import { Page } from './_Page';

export default class ConsumerReports extends Page {
    static removeTrailingSlashIfNecessary(url) {
        if (url[url.length - 1] === '/') {
            url = url.substring(0, url.length - 1);
        }
        return url;
    }

    static openAllLinks() {
        //get the current year
        let currYear = document
            .querySelector('div.crux-section-header.generation-range__header')
            .textContent.trim();

        //get all past years
        let pastYears = Array.from(
            document.querySelectorAll('.year-details__row')
        ).map(el => el.getAttribute('data-year'));

        let allYears = [currYear, ...pastYears];

        //generate and open links for all years
        let windowHref = this.removeTrailingSlashIfNecessary(
            window.location.href
        );
        allYears.forEach(year => {
            window.open(`${windowHref}/${year}`);
        });
    }
}
