import {Injectable} from '@angular/core';
import {ShellClientService} from './shell-client/shell-client.service';
import {Group} from './model/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private shellClient: ShellClientService) {
  }

  getGroups(): Promise<Group[]> {
    return this.shellClient.GetTeams();
  }
}
