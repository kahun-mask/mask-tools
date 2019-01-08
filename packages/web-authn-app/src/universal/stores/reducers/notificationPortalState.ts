import { handleActions } from 'redux-actions';
import {
  ADD_NOTIFICATION_ITEM,
  REMOVE_NOTIFICATION_ITEM,
} from '../actionTypes/notificationPortalActionTypes';
import { AppState } from '../types/AppState';

export const notificationPortalState = handleActions<
  AppState.NotificationPortalState,
  AppState.NotificationPortalPayload
>({
  [ADD_NOTIFICATION_ITEM]: (state, { payload }) => {
    return { ...state, ...payload };
  },
  [REMOVE_NOTIFICATION_ITEM]: (state, { payload}) => {
    return { ...state, ...payload };
  },
}, {
  notification: null,
});
