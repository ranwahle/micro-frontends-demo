import {Component, OnInit} from '@angular/core';
import {MicroAppsManager} from '../../../lib/src/micro-apps-manager';
import {EventManager} from '../../../lib/src/event-manager';
import {Store} from '@ngrx/store';
import {AppLoadedAction} from './store/app.actions';
import {Observable} from 'rxjs/index';
import {MicroAppState} from './store/app.reducers';
import {microAppsSelector} from './store/app.selectors';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    microApps$: Observable<{ [appName: string]: MicroAppState }>
    private appsEventManager: EventManager;

    constructor(private store: Store<any>) {

    }

    ngOnInit() {
        this.microApps$ = this.store.select(microAppsSelector);
        const appManager = new MicroAppsManager();
        appManager.configuraArea({
            frameContentFillingMethod: 'SourceUrl', frameAreaSelector: '#micro-apps-frame'
        })
        appManager.initApps([{id: 'teams', entryUrl: '/teams-app/', title: 'teams'},
            {id: 'games', entryUrl: '/games-app', title: 'games'},
            {id: 'team-details', entryUrl: '/team-details-app', title: 'Team Details'}
        ])
        this.appsEventManager = (window as any).microAppsEventsManager;
        this.appsEventManager.subscribe('loaded', args => {
            console.log('args', args)
            const loadedApp = appManager.findAppByWindow(args.context);
            this.store.dispatch(new AppLoadedAction(loadedApp))

        });

        this.appsEventManager.subscribe('routeChanged', args => {
            window.history.replaceState(null, null, `${appManager.shownApp.id}${args}`);
        })
    }

}
