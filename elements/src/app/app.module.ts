import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterLinkComponent} from './router-link/router-link.component';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    RouterLinkComponent
  ],
  entryComponents: [
    RouterLinkComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const routerLink = createCustomElement(RouterLinkComponent, {injector});
    customElements.define('router-link', routerLink);
  }
}
