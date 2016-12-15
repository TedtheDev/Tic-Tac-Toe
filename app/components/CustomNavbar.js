const React = require('react');

//require componenets
const HamburgerSVG = require('./HamburgerSVG');

//Create JSX
const CustomNavbar = React.createClass({
  render() {
    return(
      <nav>
        <div>
          <p>Tic Tac Toe</p>
          <HamburgerSVG />
        </div>
      </nav>
    )
  }
});

module.exports = CustomNavbar;
