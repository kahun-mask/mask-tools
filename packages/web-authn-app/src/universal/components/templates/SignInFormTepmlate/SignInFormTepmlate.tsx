import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { signInAction } from '../../../stores/actions/authenticationAction';
import { SignInFormOrg } from '../../organisms/SignInFormOrg';

interface Props {
  signIn(username: string): void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (username: string) => dispatch(
    signInAction(username) as any,
  ),
});

export class SignInFormTemplateImpl extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <section className="SignInFormTemplate">
        <SignInFormOrg onSubmit={this.props.signIn} />
      </section>
    );
  }
}

export const SignInFormTemplate = connect(null, mapDispatchToProps)(
  SignInFormTemplateImpl,
);
