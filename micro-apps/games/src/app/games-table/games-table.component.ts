import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GroupsService} from '../groups.service';
import {Group} from '../model/group.interface';
import {Game} from '../model/game.interface';
import {GamesService} from '../games.service';
import {first} from 'rxjs/internal/operators';

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss']
})
export class GamesTableComponent implements OnInit {

  groups: Group[];
  games: Game[] = [];

  constructor(private groupsService: GroupsService, private gamesService: GamesService, private cdRef: ChangeDetectorRef) {
  }

  addGame(game: Game) {
    this.games.push(game);
    this.gamesService.saveGames(this.games).subscribe(() => {
      this.gamesService.getGames().pipe(first()).subscribe(games => this.games = games);
    });
  }

  ngOnInit() {
    this.groupsService.getGroups().then(groups => {
        this.groups = groups
      this.cdRef.detectChanges();

      }
    );

    this.gamesService.getGames().pipe(first()).subscribe(games => this.games = games);
  }

}
