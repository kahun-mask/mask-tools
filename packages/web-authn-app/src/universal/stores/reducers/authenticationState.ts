import { handleActions } from 'redux-actions';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from '../actionTypes/authenticationActionTypes';

export const authenticationState = handleActions({
  [SIGN_IN_START](state, { payload }) {
    return { ...state, ...payload };
  },
  [SIGN_UP_SUCCESS](state, { payload }) {
    return { ...state, ...payload };
  },
  [SIGN_UP_FAILURE](state, { payload }) {
    return { ...state, ...payload };
  },
  [SIGN_UP_START](state, { payload }) {
    return { ...state, ...payload };
  },
  [SIGN_IN_SUCCESS](state, { payload }) {
    return { ...state, ...payload };
  },
  [SIGN_IN_FAILURE](state, { payload }) {
    return { ...state, ...payload };
  },
}, {});
