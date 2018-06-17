import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../model/group.interface';
import {Game} from '../../model/game.interface';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  @Input() groups: Group[];
  @Input() game: Game;

  @Output() saveGame: EventEmitter<Game> = new EventEmitter<Game>();

  constructor() {
  }

  saveGameClick() {

    this.saveGame.emit(this.game);
  }

  ngOnInit() {
    this.game = this.game || {group1: undefined, group2: undefined, date: undefined, score1: undefined, score2: undefined}
  }

}
