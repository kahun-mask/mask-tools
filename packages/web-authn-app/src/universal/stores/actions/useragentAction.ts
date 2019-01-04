import { createAction } from 'redux-actions';
import { isServer } from '../../utils/useragentUtils';
import { WEB_AUTHN_CHECK } from '../actionTypes/useragentActionTypes';

export const webAuthnCheck = createAction(WEB_AUTHN_CHECK, () => {
  if (isServer()) {
    throw new Error('Cannot call is server.');
  }
  const webAuthnSupported: boolean =
    !!(window as any).PublicKeyCredential &&
    !!(window.navigator as any).credentials;
  return {
    webAuthnSupported,
  };
});
