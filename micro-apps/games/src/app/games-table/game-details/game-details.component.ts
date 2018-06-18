import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Group} from '../../model/group.interface';
import {Game} from '../../model/game.interface';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  @Output() saveGame: EventEmitter<Game> = new EventEmitter<Game>();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  private _groups: Group[];

  get groups(): Group[] {
    return this._groups;
  }

  @Input() set groups(groups: Group[]) {
    this._groups = groups;
    if (this.game) {
      this.setGameGroups();
    }
  }

  private _game: Game;

  get game(): Game {
    return this._game;
  }

  @Input() set game(game: Game) {
    this._game = game;
    if (!this.groups) {
      return;
    }
    this.setGameGroups();

  }

  saveGameClick() {

    this.saveGame.emit(this.game);
  }

//  @ViewChild('group1')

  ngOnInit() {
    this.game = this.game || {
      group1: {id: 0, name: ''},
      group2: {id: 0, name: ''},
      date: undefined,
      score1: undefined,
      score2: undefined
    }
  }

  private setGameGroups() {
    this.game.group1 = this.groups.find(group => group && this.game.group1 && group.id === this.game.group1.id) || this.game.group1;
    this.game.group2 = this.groups.find(group => group && this.game.group2 && group.id === this.game.group2.id) || this.game.group2;
     setTimeout(() => this.cdRef.detectChanges())
  }

}
