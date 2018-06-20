import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from './model/game.interface';
import {Observable} from 'rxjs/index';
import {ShellClientService} from './shell-client/shell-client.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient, private shellClient: ShellClientService) { }

  getGames() : Promise<Game[]> {
    return this.shellClient.getGames();
  }

  saveGames(games: Game[]) {
   return  this.http.post('http://localhost:3002/games', games)
  }
}
