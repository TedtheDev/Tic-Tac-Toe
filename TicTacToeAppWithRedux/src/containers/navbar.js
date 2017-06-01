import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import NavbarRightElement from './navbarrightelement';

class Navbar extends Component {
  constructor(props){
    super(props);

    this.state =({
      drawerOpen: false
    })

    this.onLeftIconButtonTouchTapMenu = this.onLeftIconButtonTouchTapMenu.bind(this);
    this.onTouchTapDrawerClose = this.onTouchTapDrawerClose.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  onLeftIconButtonTouchTapMenu() {
    this.setState({drawerOpen: true})
  }

  onTouchTapDrawerClose() {
    this.setState({drawerOpen: false})
  }

  onDrawerClose() {
    this.setState({drawerOpen: false})
  }

  render() {
    const linkStyle = {textDecoration:"none"};

    return (
      <header className="navbar-wrapper">
        <AppBar
          showMenuIconButton={this.props.isAuthenticated}
          title={<Link to='/' style={{cursor:"pointer",textDecoration:"none", color:"white"}}>Tic Tac Toe</Link>}
          onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTapMenu}
          iconElementRight={(this.props.isAuthenticated) ? <NavbarRightElement/> : <div></div>}
        />
        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={this.onDrawerClose}
        >
          <Link style={linkStyle} to='/play'>
            <MenuItem
              onTouchTap={this.onTouchTapDrawerClose}
            >
              Play
            </MenuItem>
          </Link>
          <Link style={linkStyle} to="/account">
            <MenuItem
              onTouchTap={this.onTouchTapDrawerClose}
            >
              Account Settings
            </MenuItem>
          </Link>
        </Drawer>
      </header>
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
