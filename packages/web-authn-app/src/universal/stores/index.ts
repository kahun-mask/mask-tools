import { FluxStandardAction } from 'flux-standard-action';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { reducerMap } from './reducers';
import { AppState } from './types/AppState';

export const createAppStore = (preloadedState?: AppState.AppState) => {
  return createStore<
    AppState.AppState,
    FluxStandardAction<any>,
    unknown,
    unknown>(
    combineReducers(reducerMap),
    preloadedState,
    applyMiddleware(
      thunk,
    ),
  );
};
