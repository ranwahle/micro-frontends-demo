import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ShellClientModule} from './shell-client/shell-client.module';
import { GamesTableComponent } from './games-table/games-table.component';
import {GroupsService} from './groups.service';
import { GameDetailsComponent } from './games-table/game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesTableComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    ShellClientModule
  ],
  providers: [GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
