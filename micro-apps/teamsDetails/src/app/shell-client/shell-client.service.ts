import {Injectable} from '@angular/core';
import {MicroAppsServiceManager} from '../../../../../lib/src/micro-apps-service-manager';
import {NavigationEnd, Router} from '@angular/router';
import {MicroAppsEvents} from '../../../../../lib/src/micro-apps-events';
import {EventManager} from '../../../../../lib/src/event-manager';
import {Location} from '@angular/common';

const shellParent: any = window.parent;
const myWindow = window as any;

@Injectable()
export class ShellClientService {

  private serviceManager: MicroAppsServiceManager = shellParent.microAppsServiceManager as MicroAppsServiceManager;
  private eventsManager: EventManager = shellParent.microAppsEventsManager;

  constructor(private router: Router, private location: Location) {

    this.router.events.subscribe(changes => {
      if (changes instanceof (NavigationEnd)) {
        this.eventsManager.dispatch('routeChanged', changes.urlAfterRedirects)
      }
    });

    myWindow.setState = url => {
      this.location.replaceState(url)
    }
  }

  getTeams(): Promise<any> {
    return this.serviceManager.requestService('get-teams')
  }

}
