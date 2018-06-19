import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellClientService} from './shell-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ShellClientService],
  declarations: [],
})
export class ShellClientModule {
}
