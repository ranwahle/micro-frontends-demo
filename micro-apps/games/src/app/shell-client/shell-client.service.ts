import {Injectable} from '@angular/core';
import {MicroAppsServiceManager} from '../../../../../lib/src/micro-apps-service-manager';
import {HttpClient} from '@angular/common/http';
import {Game} from '../model/game.interface';

const shellParent: any = window.parent;

@Injectable({
  providedIn: 'root'
})
export class ShellClientService {

  private serviceManager: MicroAppsServiceManager = shellParent.microAppsServiceManager as MicroAppsServiceManager;

  constructor(private http: HttpClient) {
    this.serviceManager.registerService('get-games', () =>
      this.getGames())
  }


  getGames(): Promise<Game[]> {
    return new Promise<Game[]>((resolve) => {
      this.http.get('http://localhost:3002/games').subscribe(
        (result: Game[]) => resolve(result.sort((game1, game2) => new Date(game1.date).getTime() - new Date(game2.date).getTime()))
      )
    })
  }

  getTeams(): Promise<any> {
    return this.serviceManager.requestService('get-teams')
  }
}
