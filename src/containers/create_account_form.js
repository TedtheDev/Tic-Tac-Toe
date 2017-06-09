import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    //"firstName",
    //"lastName",
    "email",
    "username",
    "password",
    "confirmPassword"
  ]
  requiredFields.map((field) => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  });

  if(values.password && values.password.length !== 0 && values.password !== values.confirmPassword) {
    errors['confirmPassword'] = 'Passwords do not match';
    errors['password'] = 'Passwords do not match';
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
  //background:"#00bcd4"
}

class CreateAccountForm extends Component {
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
    const { handleSubmit, onSubmitCreateAccount, ...rest } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmitCreateAccount)}>
        <Paper zDepth={5} style={{padding:"1rem", display:"flex",flexDirection:"column", justifyContent:"center"}}>
          <h2>Create Your Account</h2>
          <Field
            theType="text"
            name="username"
            onInputChange={rest.onInputChangeUsername}
            theValue={rest.username}
            component={this.renderTextField}
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
            name="password"
            onInputChange={rest.onInputChangePassword}
            theValue={rest.password}
            component={this.renderTextField}
            label="Password"
          />
          <Field
            theType="password"
            name="confirmPassword"
            onInputChange={rest.onInputChangeConfirmPassword}
            theValue={rest.confirmPassword}
            component={this.renderTextField}
            label="Confirm Password"
          />
          {this.renderErrorMessage(rest.errorMessage)}
          <div style={{display:"flex", justifyContent:"center", margin:"3%"}}>
            <RaisedButton type="submit" primary={true} label='Create Account' />
          </div>
        </Paper>
      </form>
    );
  }
}

export default reduxForm({
  form: "CreateAccountForm",
  validate
})(CreateAccountForm)
/*
take out and saved here just in case to add back in first and last name

  <Field
    name="firstName"
    theType="text"
    onInputChange={rest.onInputChangeFirstName}
    theValue={rest.firstName}
    component={this.renderTextField}
    label="First Name"
  />
  <Field
    theType="text"
    name="lastName"
    onInputChange={rest.onInputChangeLastName}
    theValue={rest.lastName}
    component={this.renderTextField}
    label="Last Name"
  />
*/
