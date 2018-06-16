import {Action} from '@ngrx/store';

export const APP_LOADED = `APP Loaded`;

export class AppLoadedAction implements Action {
  readonly type = APP_LOADED;
  constructor(public appName: string) {

  }
}
