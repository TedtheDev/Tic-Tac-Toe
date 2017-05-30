import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatMessages, deleteChatMessage } from '../actions/index';
import { bindActionCreators } from 'redux';
import CreateChatMessage from './create_chat_message';
import LoadingIcon from '../components/loadingMaterialUICircular'

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
    if(this.props.messages !== null && this.props.messages !== undefined && this.props.messages.length > 0) {
      return (
        <div style={{height: '80%'}}>
          <div className="message-board" style={{ height: '100%', width: '100%'}}>
            <div className='message-board-scroll'>
              {this.renderChatMessages(this.props.messages)}
            </div>
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
  return {
    messages: state.chatMessages.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchChatMessages, deleteChatMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
