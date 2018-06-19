import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {
  team$: Observable<any>;
  team: any;
  styleObj: any;
  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    let teamKey;
    this.route.params.subscribe((urlParameters) => {
      teamKey = urlParameters['id'];
      this.teamService.getTeam(teamKey).valueChanges().subscribe((team) => {
        this.team = team;
      });
    });

    this.styleObj = {
      'background-image': `url('assets/images/${Math.floor(Math.random() * 4) + 1}_1008_300.png')`,
    };
    console.log('team', this.team$);
  }
}
