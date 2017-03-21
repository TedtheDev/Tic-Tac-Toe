import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-inverse'>
        <div className='container-fluid' >
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' to='/'>Tic Tac Toe</Link>
          </div>
          <div className='collapse navbar-collapse' id='myNavbar'>
            <ul className='nav navbar-nav'>
              <li className='active'>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/play'>Play</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
