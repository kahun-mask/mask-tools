import * as React from 'react';
import { SignInFormTemplate } from '../../templates/SignInFormTepmlate';
import { SignUpFormTemplate } from '../../templates/SignUpFormTemplate';

export class IndexPage extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <header>
          <h1>Web Authn App</h1>
        </header>
        <main>
          <SignUpFormTemplate />
          <SignInFormTemplate />
        </main>
      </React.Fragment>
    );
  }
}
