import React, { Component, PropTypes } from 'react';
import { logoutUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import NavbarRightElement from './navbarrightelement';

class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props){
    super(props);

    this.state =({
      drawerOpen: false,
      showMenuIconButton: false
    })

    this.onTitleTouchTap = this.onTitleTouchTap.bind(this);
    this.onLeftIconButtonTouchTapMenu = this.onLeftIconButtonTouchTapMenu.bind(this);
    this.onTouchTapDrawerClose = this.onTouchTapDrawerClose.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  onTitleTouchTap() {
    this.context.router.push('/');
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
      <div className="navbar-wrapper">
        <AppBar
          showMenuIconButton={this.state.showMenuIconButton}
          title={<span style={{cursor:"pointer"}}>Tic Tac Toe</span>}
          onTitleTouchTap={this.onTitleTouchTap}
          onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTapMenu}
          iconElementRight={<NavbarRightElement/>}//this.state.isAuthenticated === true ? <LogoutButton /> : <p>why</p>}
        />
        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={this.onDrawerClose}
        >
          <Link style={linkStyle} to='/account'>
            <MenuItem
              onTouchTap={this.onTouchTapDrawerClose}
            >
              Create Account
            </MenuItem>
          </Link>
          <Link style={linkStyle} to="/play">
            <MenuItem
              onTouchTap={this.onTouchTapDrawerClose}
            >
              Play
            </MenuItem>
          </Link>
        </Drawer>
      </div>
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
