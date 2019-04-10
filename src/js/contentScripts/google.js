import $ from 'jquery';
import { add } from './_KeyboardShortcuts';
import './_init';

add('alt+enter', 'openAllLinks', openAllLinks);

function openAllLinks() {
    $('g-scrolling-carousel a').toArray().forEach((el) => {
        window.open($(el).attr('href'))
    });
}
