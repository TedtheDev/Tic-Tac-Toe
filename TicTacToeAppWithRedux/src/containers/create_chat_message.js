import React, { Component } from 'react';
import { createChatMessage } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const validate = (values) => {
  let errors = {}
  const requiredFields = [
    "messageToSend"
  ]

  requiredFields.map((field) => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  })

  return errors;
}

class CreateChatMessage extends Component {

  constructor(props) {
    super(props);

    this.state = { messageToSend: '', userLoggedIn: 'Tyler' };

    this.onInputChangeMessage = this.onInputChangeMessage.bind(this);
    this.onFormSubmitCreateMessage = this.onFormSubmitCreateMessage.bind(this);
    this.renderTextField = this.renderTextField.bind(this)
  }

  onInputChangeMessage(event) {
    this.setState({ messageToSend: event.target.value })
  }

  onFormSubmitCreateMessage() {
    this.props.createChatMessage(this.state.userLoggedIn, this.state.messageToSend);
    this.setState({ messageToSend: '' });
  }

  renderTextField({input, label, theType, meta: {error, touched}, onInputChange, theValue, ...custom}) {
    return (
      <TextField
        {...input}
        type={theType}
        floatingLabelText={label}
        errorText={touched && error}
        value={theValue}
        onChange={onInputChange}
      />
    )
  }

  render() {
    return (
      <div style={{height: '20%'}}>
        <form onSubmit={ this.props.handleSubmit(this.onFormSubmitCreateMessage)}>
          <Field
            name="messageToSend"
            theType="text"
            onInputChange={this.onInputChangeMessage}
            theValue={this.state.messageToSend}
            component={this.renderTextField}
            label="Enter Message"
          />
          <RaisedButton type='submit' primary={true} label="Send" />
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


CreateChatMessage = reduxForm({
  form: 'CreateMessageForm',
  touchOnBlur: false,
  validate
})(CreateChatMessage);

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatMessage);
