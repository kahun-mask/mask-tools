import { handleActions } from 'redux-actions';
import { WEB_AUTHN_CHECK } from '../actionTypes/useragentActionTypes';
import { AppState } from '../types/AppState';

export const useragentState = handleActions<
  AppState.UseragentState,
  AppState.UseragentPayload
>({
  [WEB_AUTHN_CHECK](state, { payload }) {
    return { ...state, ...payload };
  },
}, {
  webAuthnSupported: 'pending',
});
