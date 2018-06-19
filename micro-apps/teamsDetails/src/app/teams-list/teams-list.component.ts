import { Component, OnInit } from '@angular/core';
import {Team} from '../model/team.interface';
import {TeamService} from '../team/team.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {

  constructor(private teamsService: TeamService) { }
  teams: Team[]
  ngOnInit() {
    this.teamsService.getTeams().then(teams => this.teams = teams);
  }

}
