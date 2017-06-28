import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../actions/index';
import Avatar from 'material-ui/Avatar';

class AvatarProfile extends Component {
  render() {
    return (
      <Avatar size={30}
        src='http://s-media-cache-ak0.pinimg.com/originals/cb/3a/a7/cb3aa7a99159c706955dd9b4cf3ae944.jpg'
      />
    )
  }
}

export default AvatarProfile
