import React, { Component } from 'react';
import { createChatMessage } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import _  from 'lodash';

const FIELDS = {
  message: {
    type: 'input',
    label: 'Message'
  }
}

class CreateChatMessage extends Component {

  constructor(props) {
    super(props);

    this.state = { messageToSend: '', userLoggedIn: 'Tyler' };

    this.onInputChangeMessage = this.onInputChangeMessage.bind(this);
    this.onFormSubmitCreateMessage = this.onFormSubmitCreateMessage.bind(this);
  }

  onInputChangeMessage(event) {
    this.setState({ messageToSend: event.target.value })
  }

  onFormSubmitCreateMessage(event) {
    event.preventDefault();
    this.props.createChatMessage(this.state.userLoggedIn, this.state.messageToSend);
    this.setState({ messageToSend: '' });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.onFormSubmitCreateMessage}>
          <label>Message:</label>
          <input
            value={this.state.messageToSend}
            placeholder='Enter Message'
            onChange={this.onInputChangeMessage}/>
          <button type='submit' className='btn btn-success'>Send</button>
        </form>
      </div>
    );
  };
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}
function mapStateToProps(state) {
  return {
    messages: state.chatMessages.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createChatMessage }, dispatch)
}

/*
export default reduxForm({
  form: 'CreateMessage',
  fields: _.keys(FIELDS),
  validate
}, mapStateToProps, mapDispatchToProps)(CreateChatMessage);
*/
export default connect(mapStateToProps, mapDispatchToProps)(CreateChatMessage);
