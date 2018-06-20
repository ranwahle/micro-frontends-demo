import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works';

  constructor(private af: AngularFireDatabase) {
    const observable = this.af.object('contact').valueChanges();
    observable
    .subscribe(
      next => {},
      error => console.error('error', error),
      () => console.log('completed'),
    );
  }

  ngOnInit() {
    const myParent: any = window.parent;
    if (myParent && myParent.microAppsEventsManager && myParent.microAppsEventsManager.dispatch) {
      myParent.microAppsEventsManager.dispatch('loaded', {appName: 'team-details', context: window})
    }
  }
}
