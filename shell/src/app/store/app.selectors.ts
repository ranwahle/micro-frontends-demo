import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppsState} from './app.reducers';

export const micoAppsStateSelector = createFeatureSelector<AppsState>('apps')

export const microAppsSelector  = createSelector(micoAppsStateSelector, state => state.apps)
