import {Injectable} from '@angular/core';
import {MicroAppsServiceManager} from '../../../../../lib/src/micro-apps-service-manager';

const shellParent: any = window.parent;

@Injectable({
  providedIn: 'root'
})
export class ShellClientService {

  private serviceManager: MicroAppsServiceManager = shellParent.microAppsServiceManager as MicroAppsServiceManager;

  constructor() {
  }

  GetTeams() : Promise<any> {
    return this.serviceManager.requestService('get-teams')
  }
}
