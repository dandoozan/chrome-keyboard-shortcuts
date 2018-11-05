import $ from 'jquery';
import { add } from './_KeyboardShortcuts';
import './_init';

add('alt+enter', 'openAllLinks', openAllLinks);

function openAllLinks() {
    $('a.klitem').toArray().forEach((el) => {
        window.open($(el).attr('href'))
    });
}
