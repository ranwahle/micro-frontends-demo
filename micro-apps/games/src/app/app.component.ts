import {Component, OnInit} from '@angular/core';
import {ShellClientService} from './shell-client/shell-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private shellClient: ShellClientService) {

  }

  ngOnInit() {
    const myParent: any = window.parent;
    if (myParent && myParent.microAppsEventsManager && myParent.microAppsEventsManager.publish) {
      myParent.microAppsEventsManager.publish('loaded', {appName: 'games', context: window})
    }

    this.shellClient.GetTeams();
  }
}

