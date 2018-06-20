import {
  Injectable
} from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject
} from 'angularfire2/database';
import {Team} from '../model/team.interface';
import {ShellClientService} from '../shell-client/shell-client.service';

@Injectable()
export class TeamService {
  team$: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private shellClient: ShellClientService) {
  }

  getTeam(teamKey) {
    this.team$ = this.db.object(teamKey);
    return this.team$;
  }

  saveTeam(team) {
    return this.team$.update(team)
      .then(() =>{})
      .catch((err) => console.error(`Could not edit: ${err}`));
   }

  getTeams(): Promise<Team[]> {
    return this.shellClient.getTeams();
  }
}
