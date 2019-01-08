import { createActionTypeCreator } from '../../utils/reduxUtils';

const creator = createActionTypeCreator('notificationPortalActionTypes');

export const ADD_NOTIFICATION_ITEM = creator('ADD_NOTIFICATION_ITEM');
export const REMOVE_NOTIFICATION_ITEM = creator('REMOVE_NOTIFICATION_ITEM');
