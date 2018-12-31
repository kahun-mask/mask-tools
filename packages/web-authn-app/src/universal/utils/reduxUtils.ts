/**
 * create scoped action-type
 * @param scope
 * @param actionType
 * @param root
 */
export const createActionType = (
  scope: string,
  actionType: string,
  root: string,
): string => {
  return [
    root,
    scope,
    actionType,
  ].join('/');
};

/**
 * create action-type creator
 * @param scope
 * @param root
 */
export const createActionTypeCreator = (
  scope: string,
  root: string = '@app'
) => {
  return (actionType: string) => {
    return createActionType(scope, actionType, root);
  };
};
