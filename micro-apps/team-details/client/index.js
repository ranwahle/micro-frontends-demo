$('document').ready(function() {
    $.ajax('get-team-details').then(function(data) {
        console.log('data', data);
    })


})