import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatMessages, deleteChatMessage } from '../actions/index';
import { bindActionCreators } from 'redux';
import _ from 'lodash'

import CreateChatMessage from './create_chat_message';
import LoadingIcon from '../components/loading'

class Chat extends Component {
  componentDidMount() {
    this.props.fetchChatMessages();
  }

  renderChatMessages(messages) {
    return messages.map((message) => {
      return (
        <div key={message._id} className='message-bubble' style={{border: '1px solid red' }}>
          <p className="player">{message.user}</p>
          <p className="time">{message.date}</p>
          <p className="message">{message.message}</p>
          <div
            className='delete'
            onClick={this.onDeleteMessage.bind(this, message._id)}>
            <i className="fa fa-times fa-2x"></i>
          </div>
        </div>
      );
    });
  }

  onDeleteMessage(id) {
    this.props.deleteChatMessage(id)

  }

  render() {
    if(this.props.messages !== null && this.props.messages.length > 0) {
      return (
        <div style={{height: '100%'}}>
          <div className="message-board" style={{overflowY: 'scroll', height: '100%'}}>
            {this.renderChatMessages(this.props.messages)}
          </div>
          <CreateChatMessage />
        </div>
      )
    } else {
      return (
        <div style={{height: '100%'}}>
          <div style={{overflow: 'auto', height: '100%'}}>
            <LoadingIcon />
          </div>
        </div>
      )
    }
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
