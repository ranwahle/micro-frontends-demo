import {Action} from '@ngrx/store';
import {MicroApp} from '../../../../lib/src/model';

export const APP_LOADED = `APP Loaded`;

export class AppLoadedAction implements Action {
  readonly type = APP_LOADED;
  constructor(public app: MicroApp) {

  }
}
