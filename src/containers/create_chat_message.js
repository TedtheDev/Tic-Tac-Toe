import React, { Component } from 'react';
import { createChatMessage } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import io from 'socket.io-client';

const socket = io()

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

const paperStyle = {
  display:"flex",
  flexDirection:"column",
  justifyContent: "center",
  alignItems: "center"
}

class CreateChatMessage extends Component {

  constructor(props) {
    super(props);

    this.state = { messageToSend: '' };

    this.onInputChangeMessage = this.onInputChangeMessage.bind(this);
    this.onFormSubmitCreateMessage = this.onFormSubmitCreateMessage.bind(this);
    this.renderTextField = this.renderTextField.bind(this)
  }

  onInputChangeMessage(event) {
    this.setState({ messageToSend: event.target.value })
  }

  onFormSubmitCreateMessage() {
    this.props.createChatMessage(this.props.player.username, this.state.messageToSend);
    socket.emit('chat message', this.state.messageToSend)
    this.setState({ messageToSend: '' });
  }

  renderTextField({input, label, theType, meta: {error, touched}, onInputChange, theValue, ...custom}) {
    return (
      <TextField
        {...input}
        type={theType}
        floatingLabelText={label}
        floatingLabelStyle={{color:"#000000"}}
        underlineStyle={{color:"#000000"}}
        errorText={touched && error}
        value={theValue}
        onChange={onInputChange}
        autoComplete="off"
        style={{width: "80%",transform:"translateY(-1.1rem)"}}
      />
    )
  }

  render() {

    return (
      <div className="create-chat-message" >
         <form onSubmit={ this.props.handleSubmit(this.onFormSubmitCreateMessage)}>
          <Paper zDepth={5} style={paperStyle} >
            <Field
              name="messageToSend"
              theType="text"
              onInputChange={this.onInputChangeMessage}
              theValue={this.state.messageToSend}
              component={this.renderTextField}
              label="Enter Message"
            />
            <RaisedButton type='submit' primary={true} style={{}}label="Send" />
          </Paper>
        </form>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    messages: state.chatMessages.messages,
    player: state.account.player
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
