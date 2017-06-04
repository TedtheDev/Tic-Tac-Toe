import React, { Component } from 'react';
import LoginScreen from './login';
import { Link, Route } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:3050');

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '', redirect: false }

    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
  }

  onInputChangeUsername(event) {
      this.setState({ username: event.target.value})
      io.emit('username', {username: event.target.value});

  }

  onInputChangePassword(event) {
      this.setState({ password: event.target.value})
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
