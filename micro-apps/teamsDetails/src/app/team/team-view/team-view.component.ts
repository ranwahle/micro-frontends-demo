import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  team$: Observable<any>;
  team: any;
  styleObj: any;
  busy: boolean;
  newPlayer: any = {};
  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    let teamKey;
    this.busy = true;
    this.route.params.subscribe((urlParameters) => {
      teamKey = urlParameters['id'];

    this.teamService.getTeam(teamKey).valueChanges().subscribe((team) => {
      this.team = team;});
    });

    this.styleObj = {
      'background-image': `url('assets/images/${this.team.poster}')`,
    };
    setTimeout(() => { this.busy = false;
       }, 500);
    });
  }

  // addPlayer() {
  //   this.team.players = this.team.players || {};
  //   const playerKey = Object.keys(this.team.players).length;
  //   this.team.players[playerKey] = this.newPlayer;
  //   this.teamService.saveTeam(this.team)
  //   .then(() => this.newPlayer = {});
  // }
}


