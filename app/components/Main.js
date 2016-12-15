const React = require('react');

//require componenets
const Navbar = require('./Navbar');
const CustomNavbar = require('./CustomNavbar');

const Main = React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <div className='container-fluid'>
          {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </div>
      </div>
    )
  }
});

module.exports = Main;
