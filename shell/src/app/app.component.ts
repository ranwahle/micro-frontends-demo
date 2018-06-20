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
        appManager.initApps([{id: 'teams', entryUrl: '/teams-app/', title: 'teams',  componentId: 'teams-component', type: 'component'},
            {id: 'games', entryUrl: '/games-app', title: 'games'},
            {id: 'team-details', entryUrl: '/team-details-app', title: 'Team Details'}
        ])
        this.appsEventManager = (window as any).microAppsEventsManager;

        this.appsEventManager.subscribe(
            'loaded', args => {
            const loadedApp =
                appManager.findAppByWindow(args.context);
            if (loadedApp) {
                this.store.dispatch(new AppLoadedAction(loadedApp))
            } else {
                this.store.dispatch(new AppLoadedAction( appManager.findAppByComponentName(args.context)))

            }

        });

        this.appsEventManager.subscribe('routeChanged', args => {
            if (appManager.shownApp) {
                window.history.replaceState(null, null, `${appManager.shownApp.id}${args}`);
            }
        })
    }

}
