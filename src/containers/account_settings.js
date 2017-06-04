import React, { Component } from 'react';
import { } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AccountSettings extends Component {
  render() {
    return (
      <div>
        <p>account settings</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapDispatchToProps, mapDispatchToProps)(AccountSettings);
