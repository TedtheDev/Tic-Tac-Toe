const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const Home = React.createClass({
  render(){
    return(
      <div className='jumbotron'>
        <h1>Welcome to Tic-Tac-Toe with Socket.IO!</h1>
        <p>Click to Login or Sign Up for an Account to get started playing with your friends</p>
        <i className="fa fa-sign-in fa-5x" aria-hidden="true"></i>
        <i className="fa fa-user fa-5x" aria-hidden="true"></i>
      </div>
    )
  }
});

module.exports = Home;
