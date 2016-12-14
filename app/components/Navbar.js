const React = require('react');

const Navbar = React.createClass({
  render() {
    return(
      <div className='container-fluid'>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='#'>Tic Tac Toe</a>
            </div>
              <ul className='nav navbar-nav'>
                <li className='active'><a href='#'>Home</a></li>
                <li><a href='#'>Play</a></li>
              </ul>
          </div>
        </nav>
      </div>
    )
  }
});

module.exports = Navbar;
