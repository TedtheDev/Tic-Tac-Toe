import React, { Component } from 'react';

class Home extends Component {
  render() {
    return(
      <div className='jumbotron'>
        <h1>Welcome to Tic-Tac-Toe with Socket.IO!</h1>
        <p>Click to Login or Sign Up for an Account to get started playing with your friends</p>
        <i className="fa fa-sign-in fa-5x" aria-hidden="true"></i>
        <i className="fa fa-user fa-5x" aria-hidden="true"></i>
      </div>
    );
  };
};

export default Home;
