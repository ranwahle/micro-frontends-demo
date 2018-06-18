import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from './model/game.interface';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames() : Observable<Game[]> {
    return this.http.get('http://localhost:3002/games') as Observable<Game[]>
  }

  saveGames(games: Game[]) {
   return  this.http.post('http://localhost:3002/games', games)
  }
}
