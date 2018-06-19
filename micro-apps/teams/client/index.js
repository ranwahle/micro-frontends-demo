$(document).ready(function() {
    const shellAppClient = new shellAppClient();

    shellAppClient.notifyLoaded();
    shellAppClient.registerDataService('get-teams', () =>  $.ajax('get-team-details') )
    $.ajax('get-team-details').then(function(data) {
        data.forEach(team => {
            addTeamSection(team);
        })
    })

function addTeamSection(team) {
    const element = document.createElement('div')
    element.innerHTML =  `<a href="/team-details/?id=${team.id}">${team.name}</a>`;
    document.body.appendChild(element);
}


})