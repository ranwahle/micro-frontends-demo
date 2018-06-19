import {Action, ActionReducerMap} from '@ngrx/store';
import {APP_LOADED, AppLoadedAction} from './app.actions';

export interface MicroAppState {
  loaded: boolean;
  title: string;
}

export interface AppsState {
  apps: { [appName: string]: MicroAppState }
}

const initialState: AppsState = {apps: {}};

export interface State {
  apps: AppsState;
}

export const combinedReducers: ActionReducerMap<State> = {
  apps: appReducer
}

function appReducer(state: AppsState = initialState, action: Action) {
  switch (action.type) {
    case APP_LOADED: {
      const newStateApps = {...state.apps};
     const app = (action as AppLoadedAction).app;
      newStateApps[app.id] = newStateApps[app.id] || {loaded: false, title: app.title};
      newStateApps[app.id].loaded = true;
        newStateApps[app.id].title = app.title;
      return {...state, apps: newStateApps};
    }
    default: {
      return state;
    }
  }

}
