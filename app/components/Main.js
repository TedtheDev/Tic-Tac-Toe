const React = require('react');

//require componenets
const Navbar = require('./Navbar');

const Main = React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
      </div>
    )
  }
});

module.exports = Main;
