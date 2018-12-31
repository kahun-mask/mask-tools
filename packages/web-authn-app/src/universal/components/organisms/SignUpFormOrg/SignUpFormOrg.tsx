import * as React from 'react';

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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="displayName">
          username:
          <input
            name="displayName"
            onChange={this.handleDisplayNameChange}
            type="text"
            value={displayName}
          />
        </label>
        <label htmlFor="username">
          username:
          <input
            name="username"
            onChange={this.handleUsernameChange}
            type="text"
            value={username}
          />
        </label>

        <input type="submit" value="sign up" />
      </form>
    );
  }

}
