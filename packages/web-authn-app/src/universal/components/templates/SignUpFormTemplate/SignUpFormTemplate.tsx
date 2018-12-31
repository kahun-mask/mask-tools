import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { signUpAction } from '../../../stores/actions/authenticationAction';
import { SignUpFormOrg } from '../../organisms/SignUpFormOrg';

interface Props {
  signUp(displayName: string, username: string): void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUp: (displayName: string, username: string) => dispatch(
    signUpAction(displayName, username) as any,
  ),
});

export class SignUpFormTemplateImpl extends React.PureComponent<Props> {
  public render(): React.ReactNode {
    return (
      <section className="SignUpFormTemplate">
        <SignUpFormOrg onSubmit={this.props.signUp} />
      </section>
    );
  }
}

export const SignUpFormTemplate = connect(null, mapDispatchToProps)(
  SignUpFormTemplateImpl,
);
