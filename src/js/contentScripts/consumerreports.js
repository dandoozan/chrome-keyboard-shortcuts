import $ from 'jquery';
import { add } from './_KeyboardShortcuts';
import './_init';

add('alt+enter', 'openAllLinks', openAllLinks);

function openAllLinks() {
    //open links for all years
    $('.year-details__row:visible').toArray().forEach((el) => {
        window.open(`${window.location.href}/${$(el).attr('data-year')}`)
    });
}
