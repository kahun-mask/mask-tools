import { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import {
  login,
  register,
} from '../../../client/api/webAuthnApi';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from '../actionTypes/authenticationActionTypes';
import { AppState } from '../types/AppState';
import { addNotificationItem } from './notificationPortalAction';

export const signInStart = createAction<AppState.AuthenticationPayload>(
  SIGN_IN_START,
  () => ({}),
);

export const signInSuccess = createAction<AppState.AuthenticationPayload>(
  SIGN_IN_SUCCESS,
  () => {
    return {
      authenticated: true,
    };
  },
);

export const signInFailure = createAction<AppState.AuthenticationPayload>(
  SIGN_IN_FAILURE,
  () => {
    return {
      authenticated: false,
    };
  },
);

export const signInAction = (
  username: string,
) => async (
  dispatch: Dispatch,
) => {
  dispatch(signInStart());

  let result: boolean;
  let message: string = '';
  try {
    result = await login(username);
  } catch (e) {
    console.error(e);
    result = false;
    message = e.message;
  }

  if (result) {
    dispatch(signInSuccess());
    dispatch(addNotificationItem({
      title: 'Sign in: success',
      message: 'Sign in succeed.'
    }));
  } else {
    dispatch(signInFailure());
    dispatch(addNotificationItem({
      title: 'Sign in: failure',
      message: message || 'Sign in failed.'
    }));
  }
};

export const signUpStart = createAction<AppState.AuthenticationPayload>(
  SIGN_UP_START,
  () => ({}),
);

export const signUpSuccess = createAction<AppState.AuthenticationPayload>(
  SIGN_UP_SUCCESS,
  () => {
    return {
      authenticated: true,
    };
  },
);

export const signUpFailure = createAction<AppState.AuthenticationPayload>(
  SIGN_UP_FAILURE,
  () => {
    return {
      authenticated: false,
    };
  },
);

export const signUpAction = (
  displayName: string,
  username: string,
) => async (
  dispatch: Dispatch,
) => {
  dispatch(signUpStart());

  let result: boolean;
  let message: string = '';
  try {
    result = await register(displayName, username);
  } catch (e) {
    console.error(e);
    result = false;
    message = e.message;
  }

  if (result) {
    dispatch(signUpSuccess());
    dispatch(addNotificationItem({
      title: 'Sign up: success',
      message: 'Sign up succeed.'
    }));
  } else {
    dispatch(signUpFailure());
    dispatch(addNotificationItem({
      title: 'Sign up: failure',
      message: message || 'Sign up failed.',
    }));
  }
};
