$(document).ready(function() {
    var appClient = new shellAppClient();

    appClient.notifyLoaded();
    $.ajax('get-team-details').then(function(data) {
        console.log('data', data);
    })




})