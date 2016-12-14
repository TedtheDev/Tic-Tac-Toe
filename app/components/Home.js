const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const Home = React.createClass({
  render(){
    return(
      <div className='row'>
        <p className='col-md-4'>Home</p>
      </div>
    )
  }
});

module.exports = Home;
