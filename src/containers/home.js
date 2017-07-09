import React, { Component } from 'react';
import LoginScreen from './login';
import { Link, Route } from 'react-router-dom';
import io from 'socket.io-client';
<<<<<<< HEAD
// production = change to ()
// dev = io('http://localhost:3050/')
=======
>>>>>>> release1.2
const socket = io();
import RaisedButton from 'material-ui/RaisedButton';

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
        <h1 style={{margin: "0 auto",textAlign:"center"}}>Tic-Tac-Toe with your friends!</h1>
        <div className="create-account-wrapper">
          <Link to='/account' style={{textDecoration:"none"}}>
            <RaisedButton
              label="Create Your Account"
              labelPosition="before"
              primary={true}
              fullWidth={true}
              icon={<i className="material-icons md-light" style={{color:"#ffffff"}}>account_circle</i>}
            />
          </Link>
        </div>
        <LoginScreen />
      </div>
    );
  };
};

export default Home;
