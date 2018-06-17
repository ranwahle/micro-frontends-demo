import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ShellClientModule} from './shell-client/shell-client.module';
import { GamesTableComponent } from './games-table/games-table.component';
import {GroupsService} from './groups.service';
import { GameDetailsComponent } from './games-table/game-details/game-details.component';
import {
  MatDatepickerModule,
  MatDividerModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

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
    MatDatepickerModule
  ],
  providers: [GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
