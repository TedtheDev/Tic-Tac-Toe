import React, { Component } from 'react';
import LogoutButton from './logoutbutton';
import AvatarProfile from './avatarprofile';

class NavbarRightElement extends Component {
  render() {
    return (
      <div className="navbar-right-element">
        <AvatarProfile />
        <LogoutButton />
      </div>
    )
  }
}

export default NavbarRightElement;
