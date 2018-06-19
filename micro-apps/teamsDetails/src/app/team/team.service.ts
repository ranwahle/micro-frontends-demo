import {
  Injectable
} from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject
} from 'angularfire2/database';

@Injectable()
export class TeamService {
  team$: AngularFireObject < any > ;

  constructor(private db: AngularFireDatabase) {}
  getTeam(teamKey) {
    console.log('teamKey', teamKey);
    this.team$ = this.db.object(teamKey);
    return this.team$;
  }

  saveTeam(team) {
    return this.team$.update(team)
      .then(() => console.log('Edit success'))
      .catch((err) => console.error(`Could not edit: ${err}`));
   }
}
