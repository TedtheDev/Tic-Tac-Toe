import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UpdateAccount extends Component {
  render() {
    return (
      <div>
        Update Account Coming soon
      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount)