import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { reducerMap } from './reducers';

export const createAppStore = (preloadedState: any) => {
  return createStore(
    combineReducers(reducerMap),
    preloadedState,
    applyMiddleware(
      thunk,
    ),
  );
};
