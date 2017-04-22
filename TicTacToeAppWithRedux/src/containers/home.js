import React, { Component, PropTypes } from 'react';
import LoginScreen from './login';
import { Link } from 'react-router';

class Home extends Component {
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
    return(
      <div className='jumbotron'>
        <h1>Welcome to Tic-Tac-Toe with Socket.IO!</h1>
        <p>Click to Login or Sign Up for an Account to get started playing with your friends</p>
        <div>
          <i className="fa fa-sign-in fa-5x" aria-hidden="true"></i>
          <span>Sign-in</span>
        </div>
        <Link to='/account'>
          <i className="fa fa-user fa-5x" aria-hidden="true"></i>
          <span>Create an Account</span>
        </Link>
        <LoginScreen />
      </div>
    );
  };
};

export default Home;
