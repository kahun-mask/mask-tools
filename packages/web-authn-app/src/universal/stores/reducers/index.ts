import { ReducersMapObject } from 'redux';
import { authenticationState } from './authenticationState';
import { useragentState } from './useragentState';

export const reducerMap: ReducersMapObject = {
  authenticationState,
  useragentState,
};
