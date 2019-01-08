import { createAction } from 'redux-actions';
import { isServer } from '../../utils/useragentUtils';
import { WEB_AUTHN_CHECK } from '../actionTypes/useragentActionTypes';
import { AppState } from '../types/AppState';

export const webAuthnCheck = createAction<
  AppState.UseragentPayload
  >(WEB_AUTHN_CHECK, () => {
  if (isServer()) {
    throw new Error('Cannot call in server.');
  }
  const webAuthnSupported: AppState.SupportedType = (
    !!(window as any).PublicKeyCredential &&
    !!(window as any).CredentialsContainer &&
    !!(window.navigator as any).credentials
  ) ? 'supported' : 'unsupported';
  return {
    webAuthnSupported,
  };
});
