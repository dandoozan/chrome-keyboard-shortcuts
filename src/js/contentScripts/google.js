const KS = require('../modules/KS');
const $ = require('jquery');

KS.add('alt+enter', openAllLinks);

function openAllLinks() {
    $('a.klitem').toArray().forEach((el) => {
        window.open($(el).attr('href'))
    });
}