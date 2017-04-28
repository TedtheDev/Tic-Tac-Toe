import React, { Component, PropTypes } from 'react';
import { logoutUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props){
    super(props);

    this.onClickLogoutUser = this.onClickLogoutUser.bind(this);
  }

  onClickLogoutUser() {
      this.props.logoutUser();
      this.context.router.push('/');
  }

  render() {

    let logout = null;

    if(this.state !== null && this.state.isAuthenticated !== null && this.state.isAuthenticated) {
      logout = (
        <li>
          <button onClick={this.onClickLogoutUser} value='Logout'>Logout</button>
        </li>
      )
    } else {
      logout = <div />
    }

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
              {logout}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
