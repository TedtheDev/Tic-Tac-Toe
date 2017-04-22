import React, { Component, PropTypes } from 'react';
import { }
class LoginScreen extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = { username: '', password: '' }

    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this)
  }

  onInputChangeUsername(event) {
      this.setState({ username: event.target.value})
  }

  onInputChangePassword(event) {
      this.setState({ password: event.target.value})
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.context.router.push('/play');
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.onLoginSubmit }>
          <label>Login: </label>
          <input
            type='text'
            value={this.state.username}
            placeholder='Username'
            onChange={this.onInputChangeUsername}
          />
          <label>Password: </label>
          <input
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={this.onInputChangePassword}
          />
          <button type="submit" className='btn btn-success'>Login</button>
        </form>
      </div>
    );
  };
};

export default LoginScreen;
