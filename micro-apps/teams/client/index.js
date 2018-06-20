import {shellAppClient} from  './shell-app-client.js';
import $ from '../node_modules/jquery/dist/jquery.js';
const shellClient = new shellAppClient();


$(document).ready(function() {


   // shellClient.notifyLoaded();

    const getTeams = () => $.ajax('http://localhost:3001/get-team-details');
    // shellClient.registerDataService('get-teams', () => getTeams())
    shellClient.registerDataService('get-teams', () => getTeams() )

    getTeams().then(function(data) {
        data.forEach(team => {
            addTeamSection(team);
        })
    })

function addTeamSection(team) {
    const element = document.createElement('div')
    element.id = `team-${team.id}`;
    element.innerHTML =  `<a href="/team-details/?id=${team.id}" onclick="return getGames(${team.id})">${team.name}</a>`;
    document.body.appendChild(element);
}


})



function getGames(teamId) {
    shellClient.requestService('get-games').then(games => {
        games = games.filter(game => game.group1.id === teamId || game.group2.id === teamId );
       //  games.forEach(game => addGameSection(game));

        return games;
    })
    return false;
}

window.setState = url => {}