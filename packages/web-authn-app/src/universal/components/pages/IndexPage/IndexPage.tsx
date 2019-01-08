import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { DefaultHeader } from '../../templates/DefaultHeader';
import { NotificationPortal } from '../../templates/NotificationPortal/NotificationPortal';
import { SignTab } from '../../templates/SignTab';
import { UnsupportedBrowser } from '../../templates/UnsupportedBrowser/UnsupportedBrowser';

export class IndexPage extends React.Component {
  public render() {
    return (
      <Container>
        <DefaultHeader />
        <UnsupportedBrowser />
        <main>
          <SignTab />
        </main>
        <NotificationPortal />
      </Container>
    );
  }
}
