import * as React from 'react';

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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">
          username:
          <input
            name="username"
            onChange={this.handleChange}
            type="text"
            value={username}
          />
        </label>

        <input type="submit" value="sign in" />
      </form>
    );
  }

}
