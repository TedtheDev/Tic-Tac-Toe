import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatMessages } from '../actions/index';
import { bindActionCreators } from 'redux';

import MainChat from './mainchat';

class Chat extends Component {
  componentWillMount() {
    this.props.fetchChatMessages();
    console.log(this.props.messages);
  }

  render() {
    return (
      <div>
        {this.props.messages[0]}
      </div>
    )
  }
};

function mapStateToProps(state) {
  //whatever is returned will show up as props inside of Chat
  return {
    messages: state.messages
  };
}

// anything returned from this function will end up as
// props on the Chat container
function mapDispatchToProps(dispatch) {
  // whenever fetchChatMessages is called, the result should be
  // passed to all of the reducers
  return bindActionCreators({ fetchChatMessages: fetchChatMessages }, dispatch);
}

// Promote Chat from a component to a container - it needs to know
// about this new dispatch method, fetchChatMessages. make it avaliable as a prop
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
