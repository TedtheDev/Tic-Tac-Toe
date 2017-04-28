import React, { Component, PropTypes } from 'react';
import { loginPlayer } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../components/loading';
import { Link } from 'react-router';

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
    const creds = { username: this.state.username, password: this.state.password };
    this.props.loginPlayer(creds)
      .then(() => { this.context.router.push('/play');})
      .catch()

  }

  render() {
    if(this.props.isFetching) {
      return (
        <LoadingIcon />
      )
    }

    if(this.props.isAuthenticated) {
      return (
        <div>
          <Link to='/play'>Play a Game</Link>
        </div>
      )
    }

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
          <span>{this.state.errorMessage}</span>
        </form>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginPlayer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
