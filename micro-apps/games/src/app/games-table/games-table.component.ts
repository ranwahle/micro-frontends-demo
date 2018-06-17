import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../groups.service';
import {Group} from '../model/group.interface';
import {Game} from '../model/game.interface';

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss']
})
export class GamesTableComponent implements OnInit {

  private groups: Group[];
  private games: Game[] = [];

  constructor(private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.groupsService.getGroups().then(groups => this.groups = groups);
  }

}
