import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { DefaultHeader } from '../../templates/DefaultHeader';
import { SignTab } from '../../templates/SignTab';

export class IndexPage extends React.Component {
  public render() {
    return (
      <Container>
        <DefaultHeader />
        <main>
          <SignTab />
        </main>
      </Container>
    );
  }
}
