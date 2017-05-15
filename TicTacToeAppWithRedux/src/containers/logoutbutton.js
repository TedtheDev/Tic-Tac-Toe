import React, { Component, PropTypes } from 'react';
import { logoutUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';

class LogoutButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.onTouchTapLogout = this.onTouchTapLogout.bind(this);
  }

  onTouchTapLogout() {
      this.props.logoutUser();
      this.context.router.push('/');
  }

  render() {
    return (
      <FlatButton style={{color:"#ffffff"}} onTouchTap={this.onTouchTapLogout} label='Logout' />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(LogoutButton)
