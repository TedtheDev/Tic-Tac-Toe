import React, { Component } from 'react';
import { loginPlayer } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../components/loadingMaterialUICircular';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import LoginForm from './loginform';


class LoginScreen extends Component {
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

  onLoginSubmit() {
    const creds = { username: this.state.username, password: this.state.password };
    this.props.loginPlayer(creds);

  }


  render() {
    if(this.props.isFetching) {
      return (
        <LoadingIcon />
      )
    }

    if(this.props.isAuthenticated === true) {
      return (
        <div>
          <Link to='/play'>Play a Game</Link>
        </div>
      )
    }

    return (
      <div>
        <LoginForm onLoginSubmit={ this.onLoginSubmit }
          username={this.state.username}
          onInputChangeUsername={this.onInputChangeUsername}
          password={this.state.password}
          onInputChangePassword={this.onInputChangePassword}
          errorMessage={this.props.errorMessage}
        />
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
