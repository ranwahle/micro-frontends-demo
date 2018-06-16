import {Action, ActionReducerMap} from '@ngrx/store';
import {APP_LOADED, AppLoadedAction} from './app.actions';

export interface MicroAppState {
  loaded: boolean;
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
  console.log('state', state)
  switch (action.type) {
    case APP_LOADED: {
      const newStateApps = {...state.apps};
     const appName = (action as AppLoadedAction).appName;
      newStateApps[appName] = newStateApps[appName] || {loaded: false};
      newStateApps[appName].loaded = true;
      return {...state, apps: newStateApps};
    }
    default: {
      return state;
    }
  }

}
