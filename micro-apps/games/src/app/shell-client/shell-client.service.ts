import { Injectable } from '@angular/core';
import {MicroAppsServiceManager} from '../../../../../lib/src/micro-apps-service-manager';

const shellParent: any = window.parent;

@Injectable({
  providedIn: 'root'
})
export class ShellClientService {

  private serveceManager: MicroAppsServiceManager =  shellParent.microAppsServiceManager as MicroAppsServiceManager;
  GetTeams() {
  return this.serveceManager.requestService('get-teams')
  }

  constructor() { }
}
