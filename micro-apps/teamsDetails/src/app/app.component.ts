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
      next => console.log('next', next),
      error => console.log('error', error),
      () => console.log('completed'),
    );
  }

  ngOnInit() {
    const myParent: any = window.parent;
    if (myParent && myParent.microAppsEventsManager && myParent.microAppsEventsManager.publish) {
      myParent.microAppsEventsManager.publish('loaded', {appName: 'team-details', context: window})
    }
  }
}
