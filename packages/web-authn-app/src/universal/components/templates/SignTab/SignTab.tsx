import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Tab } from 'semantic-ui-react'
import {
  signInAction,
  signUpAction,
} from '../../../stores/actions/authenticationAction';
import { SignInFormOrg } from '../../organisms/SignInFormOrg';
import { SignUpFormOrg } from '../../organisms/SignUpFormOrg';

interface Props {
  signIn(username: string): void;
  signUp(displayName: string, username: string): void;
}

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
}) => (
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

export const SignTab = connect(null, mapDispatchToProps)(
  SignTabImpl,
);

