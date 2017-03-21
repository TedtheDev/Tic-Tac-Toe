const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const Navbar = React.createClass({
  render() {
    return(
        <nav className='navbar navbar-inverse'>
          <div className='container-fluid' >
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <a className='navbar-brand' href='#'>Tic Tac Toe</a>
            </div>
            <div className='collapse navbar-collapse' id='myNavbar'>
              <ul className='nav navbar-nav'>
                <li className='active'>
                  <Link to='/'>
                    <a href='#'>Home</a>
                  </Link>
                </li>
                <li>
                  <Link to='/play'>
                    <a href='#'>Play</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }
});

module.exports = Navbar;
