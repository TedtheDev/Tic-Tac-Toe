import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';

class LogoutButton extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onTouchTapLogout = this.onTouchTapLogout.bind(this);
  }

  onTouchTapLogout() {
      this.props.logoutUser();
      this.props.history.push('/');
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


export default withRouter(connect(null, mapDispatchToProps)(LogoutButton))
