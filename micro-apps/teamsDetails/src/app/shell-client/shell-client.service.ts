import {Injectable} from '@angular/core';
import {MicroAppsServiceManager} from '../../../../../lib/src/micro-apps-service-manager';
import {NavigationEnd, Router} from '@angular/router';
import {MicroAppsEvents} from '../../../../../lib/src/micro-apps-events';
import {EventManager} from '../../../../../lib/src/event-manager';

const shellParent: any = window.parent;

@Injectable()
export class ShellClientService {

  private serviceManager: MicroAppsServiceManager = shellParent.microAppsServiceManager as MicroAppsServiceManager;
  private eventsManager: EventManager = shellParent.microAppsEventsManager;

  constructor(private router: Router) {

    this.router.events.subscribe(changes => {
      console.log('router change', changes)
      if (changes instanceof (NavigationEnd)) {
        this.eventsManager.publish('routeChanged', changes.urlAfterRedirects)
      }
    } )
  }

  getTeams(): Promise<any> {
    return this.serviceManager.requestService('get-teams')
  }

}
