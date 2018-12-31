import { DeepPartial } from 'redux';

declare namespace AppState {

  interface AppState {
    authenticationState: AuthenticationState;
  }

  interface AuthenticationState {
    authenticated: boolean;
    name: string;
  }

  type AuthenticationPayload = DeepPartial<AuthenticationState>;

}
