import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {RouterLinkComponent} from './router-link/router-link.component';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    RouterLinkComponent
  ],
  entryComponents: [
    RouterLinkComponent
  ],
  imports: [
    BrowserModule
  ],


})
export class AppModule {
  constructor(private injector: Injector) {
    const routerLink = createCustomElement(RouterLinkComponent, {injector});
    customElements.define('router-link', routerLink);
  }

  ngDoBootstrap() {
  }
}
