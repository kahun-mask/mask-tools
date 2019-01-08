import { DeepPartial } from 'redux';

declare namespace AppState {

  interface AppState {
    authenticationState: AuthenticationState;
    notificationPortalState: NotificationPortalState;
    useragentState: UseragentState;
  }

  interface AuthenticationState {
    authenticated: boolean;
    name: string;
  }

  type AuthenticationPayload = DeepPartial<AuthenticationState>;

  interface UseragentState {
    webAuthnSupported: SupportedType;
  }

  type SupportedType = 'supported' | 'unsupported' | 'pending';

  type UseragentPayload = DeepPartial<UseragentState>;

  interface NotificationPortalState {
    notification: NotificationPortalItem | null;
  }

  interface NotificationPortalItem {
    message: string;
    title: string;
  }

  type NotificationPortalPayload = Partial<NotificationPortalState>;

}

declare global {
  interface Window {
    __STATE__: AppState.AppState;
  }
}
