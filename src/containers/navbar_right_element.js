import React, { Component } from 'react';
import LogoutButton from './logout_button';
import AvatarProfile from './avatar_profile';

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
