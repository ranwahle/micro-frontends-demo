import {Component, OnInit} from '@angular/core';
import {MicroAppsManager} from '../../../lib/src/micro-apps-manager';
import {EventManager} from '../../../lib/src/event-manager';
import {Store} from '@ngrx/store';
import {AppLoadedAction} from './store/app.actions';
import {Observable} from 'rxjs/index';
import {AppsState, MicroAppState} from './store/app.reducers';
import {microAppsSelector} from './store/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  microApps$: Observable< { [appName: string]: MicroAppState }>
  constructor(private store: Store<any>) {

  }

  private appsEventManager: EventManager;
  ngOnInit() {
    this.microApps$ = this.store.select(microAppsSelector);
    const appManager = new MicroAppsManager();
    appManager.configuraArea({
      frameContentFillingMethod: 'ContentFetch', frameAreaSelector: '#micro-apps-frame'
    })
    appManager.initApps([{name: 'team-details', entryUrl: 'http://localhost:3001'}])
    this.appsEventManager =  (window as any).microAppsEventsManager;
    this.appsEventManager.subscribe('loaded', args =>  {
      this.store.dispatch(new AppLoadedAction(args.appName))

    });
  }

}
