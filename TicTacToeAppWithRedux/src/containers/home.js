import React, { Component, PropTypes } from 'react';
import LoginScreen from './login';
import { Link } from 'react-router';
import io from 'socket.io-client';
const socket = io('http://localhost:3050');

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
      io.emit('username', {username: event.target.value});

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
      <div className='home'>
        <h1>Welcome to Tic-Tac-Toe with Socket.IO!</h1>
        <p>Login or create an account to start playing with your friends</p>
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
