
KS.add('alt+enter', openAllLinks);

function openAllLinks() {
    $('a.klitem').toArray().forEach((el) => {
        window.open($(el).attr('href'))
    });
}
