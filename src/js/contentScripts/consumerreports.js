import $ from 'jquery';
import { add } from './_KeyboardShortcuts';
import './_init';

add('alt+enter', 'openAllLinks', openAllLinks);

function removeTrailingSlashIfNecessary(url) {
    if (url[url.length - 1] === '/') {
        url = url.substring(0, url.length - 1);
    }
    return url;
}

function openAllLinks() {
    //open links for all years
    $('.year-details__row:visible')
        .toArray()
        .forEach(el => {
            let windowHref = removeTrailingSlashIfNecessary(
                window.location.href
            );
            window.open(`${windowHref}/${$(el).attr('data-year')}`);
        });
}
