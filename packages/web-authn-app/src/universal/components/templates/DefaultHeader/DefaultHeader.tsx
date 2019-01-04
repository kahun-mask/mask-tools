import * as React from 'react';
import {
  Header,
  Icon,
} from 'semantic-ui-react';

export const DefaultHeader: React.FunctionComponent = () => (
  <div style={{ padding: '40px 0 16px' }}>
    <Header as="h1" icon textAlign="center">
      <Icon name="lock" circular />
      <Header.Content>
        Psychic Web Authn
        <Header.Subheader>
          If you have Psychic, you don’t need a password.
        </Header.Subheader>
      </Header.Content>
    </Header>
  </div>
);

