import { createAction } from 'redux-actions';
import {
  ADD_NOTIFICATION_ITEM,
  REMOVE_NOTIFICATION_ITEM,
} from '../actionTypes/notificationPortalActionTypes';
import { AppState } from '../types/AppState';

export const addNotificationItem = createAction<
  AppState.NotificationPortalPayload,
  AppState.NotificationPortalItem
>(ADD_NOTIFICATION_ITEM, (notification) => {
  return { notification };
});

export const removeNotificationItem = createAction<
  AppState.NotificationPortalPayload
>(REMOVE_NOTIFICATION_ITEM, () => {
  return { notification: null };
});
