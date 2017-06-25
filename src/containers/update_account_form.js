import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "email"
  ]
  requiredFields.map((field) => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  });

  if(values.newPassword !== undefined && values.newPassword.length > 0
    && values.oldPassword === undefined ) {
    errors['oldPassword'] = 'Please enter your old password';
  }

  if(values.newPassword === undefined && values.oldPassword !== undefined && values.oldPassword.length > 0) {
    errors['newPassword'] = 'Please enter a new password';
  }

  if(values.newPassword && values.newPassword.length !== 0 && values.newPassword !== values.confirmNewPassword) {
    errors['confirmNewPassword'] = 'Passwords do not match';
    errors['newPassword'] = 'Passwords do not match';
  }

  if(values.email !== undefined && values.email.indexOf('@') === -1) {
    errors['email'] = 'Invalid Email: use @';
  }

  return errors;
}

const paperStyle = {
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
}

class UpdateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.renderTextField = this.renderTextField.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
  }

  renderTextField({input, label, theType, meta: {touched, error}, onInputChange, theValue, ...custom}) {
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
        style={{width:"90%"}}
      />
    )
  }

  renderTextFieldDisabled({input, label, theType, meta: {touched, error}, onInputChange, theValue, ...custom}) {
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
        style={{width:"90%"}}
        disabled={true}
      />
    )
  }

  renderErrorMessage(errorMessage) {
    return (
      <div style={{color:"#f44336", margin:"5% 0% 1% 0%"}}>
        <strong>{errorMessage}</strong>
      </div>
    )
  }

  render() {
    const { handleSubmit, onSubmitUpdateAccount, ...rest } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmitUpdateAccount)}>
        <Paper zDepth={5} style={{padding:"1rem", display:"flex",flexDirection:"column", justifyContent:"center"}}>
          <h2>Update Your Account</h2>
          <Field
            theType="text"
            name="username"
            onInputChange={rest.onInputChangeUsername}
            theValue={rest.username}
            component={this.renderTextFieldDisabled}
            label="Username"
          />
          <Field
            theType="text"
            name="email"
            onInputChange={rest.onInputChangeEmail}
            theValue={rest.email}
            component={this.renderTextField}
            label="Email"
          />
          <Field
            theType="password"
            name="oldPassword"
            onInputChange={rest.onInputChangeOldPassword}
            theValue={rest.oldPassword}
            component={this.renderTextField}
            label="Old Password"
          />
          <Field
            theType="password"
            name="newPassword"
            onInputChange={rest.onInputChangeNewPassword}
            theValue={rest.newPassword}
            component={this.renderTextField}
            label="New Password"
          />
          <Field
            theType="password"
            name="confirmNewPassword"
            onInputChange={rest.onInputChangeConfirmNewPassword}
            theValue={rest.confirmNewPassword}
            component={this.renderTextField}
            label="Confirm New Password"
          />
          {this.renderErrorMessage(rest.errorMessage)}
          <div style={{display:"flex", justifyContent:"center", margin:"3%"}}>
            <RaisedButton type="submit" primary={true} label='Update' />
          </div>
        </Paper>
      </form>
    );
  }
}

export default reduxForm({
  form: "UpdateAccountForm",
  validate
})(UpdateAccountForm)
