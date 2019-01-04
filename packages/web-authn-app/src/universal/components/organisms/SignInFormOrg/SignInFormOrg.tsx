import * as React from 'react';
import {
  Button,
  Container,
  Form,
} from 'semantic-ui-react';

interface Props {
  onSubmit(username: string): void;
}

interface State {
  username: string;
}

export class SignInFormOrg extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      username: '',
    };
  }

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    });
  }

  public render(): React.ReactNode {
    const { username } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor="signin_username">
              username:
            </label>
            <input
              id="signin_username"
              name="username"
              placeholder="username"
              onChange={this.handleChange}
              type="text"
              value={username}
            />
          </Form.Field>

          <Button type="submit">Sign in</Button>
        </Form>
      </Container>
    );
  }

}
