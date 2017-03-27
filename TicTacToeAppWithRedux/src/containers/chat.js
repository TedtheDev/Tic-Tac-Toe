import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatMessages } from '../actions/index';
import { bindActionCreators } from 'redux';
import _ from 'lodash'

import MainChat from './mainchat';

class Chat extends Component {
  componentWillMount() {
    this.props.fetchChatMessages();
  }

  renderChatMessages(messages) {
    return this.props.messages.map((message) => {
      return (
        <div style={{border: '1px solid red' }}>
          <p>{message.user}</p>
          <p>{message.date}</p>
          <p>{message.message}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {
          this.renderChatMessages()
        }
      </div>
    );
  };
};

function mapStateToProps(state) {
  //whatever is returned will show up as props inside of Chat
  return {
    messages: state.chatMessages.messages
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
