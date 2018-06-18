import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ShellClientModule} from './shell-client/shell-client.module';
import { GamesTableComponent } from './games-table/games-table.component';
import {GroupsService} from './groups.service';
import { GameDetailsComponent } from './games-table/game-details/game-details.component';
import {
  MatDatepickerModule,
  MatDividerModule, MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {GamesService} from './games.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GamesTableComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ShellClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [GroupsService, GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
