import React, { Component } from 'react';
import { createChatMessage } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CreateChatMessage extends Component {


  onSubmitCreateMessage(user = 'Tyler', message = 'it works from the add button') {

    this.props.createChatMessage('Tyler', 'it works from the add button');
  }

  render() {
    return (
      <div>
        <button onClick={this.onSubmitCreateMessage.bind(this)}>Create Message</button>
        <form onSubmit={ this.onSubmitCreateMessage.bind(this)}>
          <label>Message:</label>
          <input type='message' placeholder='Enter Message' />
          <button type='submit' className='btn btn-success'>Send</button>
        </form>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    messages: state.chatMessages.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createChatMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatMessage);
