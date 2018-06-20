import './index.js'
import $ from '../node_modules/jquery/dist/jquery.js';
import {shellAppClient} from "./shell-app-client";

const shellClient = new shellAppClient();

const template = ` <h1>Teams</h1>`


export default class TeamsComponent extends HTMLElement {
    constructor() {
        super();

        const self = this;

        getTeams().then(function (data) {
            data.forEach(team => {
                self.addTeamSection(team);
            })
        })
    }


    addTeamSection(team) {
        const element = document.createElement('div')
        element.id = `team-${team.id}`;
        element.innerHTML = `<a href="/team-details/?id=${team.id}" onclick="return getGames(${team.id})">${team.name}</a>`;
        this.appendChild(element);
    }


    connectedCallback() {
        this.innerHTML = template;


    }

    static create() {
        const component = new TeamsComponent();

        return component;
    }
}

const getTeams = () => $.ajax('http://localhost:3001/get-team-details');
$(document).ready(() => {
    shellClient.registerDataService('get-teams', () => getTeams())
    shellClient.notifyLoaded('teams-component')

})
customElements.define('teams-component', TeamsComponent)