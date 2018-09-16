console.log('dpd2 here');

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.req === 'dpd_req'){
        let data = {};

        //TODO: populate data

        sendResponse(data);
    }
});
