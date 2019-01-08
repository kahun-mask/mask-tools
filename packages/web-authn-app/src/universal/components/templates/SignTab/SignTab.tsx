import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Loader, Tab } from 'semantic-ui-react'
import {
  signInAction,
  signUpAction,
} from '../../../stores/actions/authenticationAction';
import { AppState } from '../../../stores/types/AppState';
import { SignInFormOrg } from '../../organisms/SignInFormOrg';
import { SignUpFormOrg } from '../../organisms/SignUpFormOrg';

interface Props {
  signIn(username: string): void;
  signUp(displayName: string, username: string): void;
  webAuthnSupported: AppState.SupportedType;
}

const mapStateToProps = (state: AppState.AppState) => {
  const webAuthnSupported: AppState.SupportedType =
    state.useragentState && state.useragentState.webAuthnSupported;
  return {
    webAuthnSupported,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (username: string) => dispatch(
    signInAction(username) as any,
  ),
  signUp: (displayName: string, username: string) => dispatch(
    signUpAction(displayName, username) as any,
  ),
});

const SignTabImpl: React.FunctionComponent<Props> = ({
  signIn,
  signUp,
  webAuthnSupported,
}) => {
  let content: React.ReactNode;
  if (webAuthnSupported === 'pending') {
    content = (
      <Loader active />
    );
  } else if (webAuthnSupported === 'supported') {
    content = (
      <Tab
        panes={[
          {
            menuItem: 'SignUp',
            render: () => (
              <Tab.Pane>
                <SignUpFormOrg onSubmit={signIn} />
              </Tab.Pane>
            ),
          },
          {
            menuItem: 'SignIn',
            render: () => (
              <Tab.Pane>
                <SignInFormOrg onSubmit={signIn} />
              </Tab.Pane>
            ),
          },
        ]}
      />
    );
  } else if (webAuthnSupported === 'unsupported') {
    content = null;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export const SignTab = connect(mapStateToProps, mapDispatchToProps)(
  SignTabImpl,
);

