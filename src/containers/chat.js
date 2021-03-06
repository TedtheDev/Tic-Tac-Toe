import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChatMessages, deleteChatMessage } from '../actions/index';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import CreateChatMessage from './create_chat_message';
import LoadingIcon from '../components/loading_material_ui_circular';
import io from 'socket.io-client';

const socket = io()

class Chat extends Component {
  constructor(props) {
    super(props);

    this.scrollToBottomChatMessages = this.scrollToBottomChatMessages.bind(this);
  }

  componentDidMount() {
      this.props.fetchChatMessages(this.props.player.username);
      this.scrollToBottomChatMessages();

      socket.on('chat message', (data) => {
        console.log(data)
      })
  }

  componentDidUpdate() {
    this.scrollToBottomChatMessages();
  }

  renderChatMessages(messages) {
      return messages.map((message, index) => {
          return (
            <div key={message._id} className='message-bubble' >
              <p className="player">{message.user}</p>
              <p className="time">{moment(message.date).format("MMM Do - h:mm A")}</p>
              <p className="message">{message.message}</p>
              <div
                className='delete'
                onClick={this.onDeleteMessage.bind(this, message._id)}>
                <i className="fa fa-times fa-1x"></i>
              </div>
            </div>
          );
      });
  }

  onDeleteMessage(id) {
    this.props.deleteChatMessage(this.props.player.username,id);
  }


  /**
   * [scrollToBottomChatMessages scroll chat messages to bottom on load and
   * new messages]
   */
  scrollToBottomChatMessages() {
    const scrollHeight = this.messageBoard.scrollHeight;
    const height = this.messageBoard.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageBoard.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
      return (
        <div className="chat-board">
          <div className="message-board" ref={(div) => this.messageBoard = div}>
            {(this.props.messages !== null && this.props.messages !== undefined && this.props.messages.length > 0) ? this.renderChatMessages(this.props.messages) : <div />}
          </div>
          <CreateChatMessage />
        </div>
      )
  };
};

function mapStateToProps(state) {
  return {
    messages: state.chatMessages.messages,
    player: state.account.player
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchChatMessages, deleteChatMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
