import * as React from 'react';
import {
  Button,
  Container,
  Form,
} from 'semantic-ui-react';

interface Props {
  onSubmit(displayName: string, username: string): void;
}

interface State {
  displayName: string;
  username: string;
}

export class SignUpFormOrg extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      displayName: '',
      username: '',
    };
  }

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { displayName, username } = this.state;
    if (displayName && username) {
      this.props.onSubmit(displayName, username);
    }
  }

  public handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      displayName: e.target.value,
    });
  }

  public handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    });
  }

  public render(): React.ReactNode {
    const { displayName, username } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor="signup_displayName">
              displayName:
            </label>
            <input
              id="signup_displayName"
              name="displayName"
              placeholder="display name"
              onChange={this.handleDisplayNameChange}
              type="text"
              value={displayName}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="signup_username">
              username:
            </label>
            <input
              id="signup_username"
              name="username"
              placeholder="username"
              onChange={this.handleUsernameChange}
              type="text"
              value={username}
            />
          </Form.Field>

          <Button type="submit">Sign up</Button>
        </Form>
      </Container>
    );
  }

}
