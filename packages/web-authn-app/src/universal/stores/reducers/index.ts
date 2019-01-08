import { ReducersMapObject } from 'redux';
import { authenticationState } from './authenticationState';
import { notificationPortalState } from './notificationPortalState';
import { useragentState } from './useragentState';

export const reducerMap: ReducersMapObject = {
  authenticationState,
  notificationPortalState,
  useragentState,
};
