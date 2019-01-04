import { createActionTypeCreator } from '../../utils/reduxUtils';

const creator = createActionTypeCreator('useragentActionType');

export const WEB_AUTHN_CHECK = creator('WEB_AUTHN_CHECK');
