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
    console.log('teamKey', teamKey);
    this.team$ = this.db.object(teamKey);
    return this.team$;
  }

  getTeams(): Promise<Team[]> {
    return this.shellClient.getTeams();
  }
}
