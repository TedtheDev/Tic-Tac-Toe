//load React and modules
const React = require('react');
const styles = require('../styles/layout');

//require componenets
const Navbar = require('./Navbar');
const CustomNavbar = require('./CustomNavbar');

//component fucntionality
const Main = React.createClass({
  render() {
    return (
      <div style={ styles.mainHeight }>
        <Navbar />
        <div className='container-fluid' style={ styles.mainHeight }>
          {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </div>
      </div>
    )
  }
});

module.exports = Main;
