import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatMessages, deleteChatMessage } from '../actions/index';
import { bindActionCreators } from 'redux';
import _ from 'lodash'

import CreateChatMessage from './create_chat_message';

class Chat extends Component {
  componentWillMount() {
    this.props.fetchChatMessages();
  }

  renderChatMessages(messages) {
    console.log('Chat Container: messages', this.props.messages);
    return this.props.messages.map((message) => {
      return (
        <div key={message._id} style={{border: '1px solid red' }}>
          <p>{message.user}</p>
          <p>{message.date}</p>
          <p>{message.message}</p>
          <button
            className='btn btn-danger'
            onClick={this.onDeleteMessage.bind(this, message._id)}>
            Delete
          </button>
        </div>
      );
    });
  }

  onDeleteMessage(id) {
    this.props.deleteChatMessage(id)

  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <div style={{overflow: 'scroll', height: '100%'}}>
          {this.renderChatMessages()}
        </div>
        <CreateChatMessage />
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
  return bindActionCreators({ fetchChatMessages, deleteChatMessage }, dispatch);
}

// Promote Chat from a component to a container - it needs to know
// about this new dispatch method, fetchChatMessages. make it avaliable as a prop
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
