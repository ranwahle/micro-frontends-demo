import 'hammerjs'; // for touch gestures
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {
  MatToolbarModule,
} from '@angular/material';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import firebaseConfig from '../fbConfig';
import { AppComponent } from './app.component';
import { TeamViewComponent } from './team/team-view/team-view.component';
import { TeamService } from './team/team.service';
import { TeamsListComponent } from './teams-list/teams-list.component';
import {ShellClientModule} from './shell-client/shell-client.module';

const MAT_MODULES  = [
  MatToolbarModule,
];

const appRoutes: Routes = [
  { path: 'team/:id', component: TeamViewComponent },
  { path: '', redirectTo: '/team/1', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    TeamViewComponent,
    TeamsListComponent,
  ],
  imports: [
    BrowserModule,
    ShellClientModule,
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    FlexLayoutModule,
    ...MAT_MODULES,
   RouterModule.forRoot(appRoutes, {useHash: false}),

  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
