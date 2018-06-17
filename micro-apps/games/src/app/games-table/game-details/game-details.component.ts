import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../model/group.interface';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  @Input() groups: Group[];
  constructor() { }

  ngOnInit() {
  }

}
