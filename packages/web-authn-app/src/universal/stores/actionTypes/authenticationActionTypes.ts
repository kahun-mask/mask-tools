import { createActionTypeCreator } from '../../utils/reduxUtils';

const creator = createActionTypeCreator('authenticationActionType');

/**
 * SignInActions
 */
export const SIGN_IN_START = creator('SIGN_IN_START');
export const SIGN_IN_SUCCESS = creator('SIGN_IN_SUCCESS');
export const SIGN_IN_FAILURE = creator('SIGN_IN_FAILURE');

/**
 * SignUpActions
 */
export const SIGN_UP_START = creator('SIGN_UP_START');
export const SIGN_UP_SUCCESS = creator('SIGN_UP_SUCCESS');
export const SIGN_UP_FAILURE = creator('SIGN_UP_FAILURE');
