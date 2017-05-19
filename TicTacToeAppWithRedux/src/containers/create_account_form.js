import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "username",
    "password",
    "confirmPassword"
  ]
  requiredFields.map((field) => {
    if(!values[field]) {
      errors[field] = 'Required'
    }
  });

  if(values.password !== values.confirmPassword) {
    errors['confirmPassword'] = 'Passwords do not match';
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
  }

  renderTextField({input, label, theType, meta: {touched, error}, onInputChange, theValue, ...custom}) {
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
    const { handleSubmit, onSubmitCreateAccount, ...rest } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmitCreateAccount)}>
        <Paper zDepth={5} >
          <Field name="firstName"
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
          <Field
            theType="text"
            name="email"
            onInputChange={rest.onInputChangeEmail}
            theValue={rest.email}
            component={this.renderTextField}
            label="Email"
          />
          <Field
            theType="text"
            name="username"
            onInputChange={rest.onInputChangeUsername}
            theValue={rest.username}
            component={this.renderTextField}
            label="Username"
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
          <RaisedButton type="submit" primary={true} label='Create Account' />
        </Paper>
      </form>
    );
  }
}

export default reduxForm({
  form: "CreateAccountForm",
  validate
})(CreateAccountForm)

/**
 * <TextField
   type="text"
   floatingLabelText="Last Name"
   onChange={this.onInputChangeLastName}
   value={this.state.lastName}
 />
 <TextField
   type="text"
   floatingLabelText="Email"
   onChange={this.onInputChangeEmail}
   value={this.state.email}
 />
 <TextField
   type="text"
   floatingLabelText="Username"
   onChange={this.onInputChangeUsername}
   value={this.state.username}
 />
 <TextField
   type="password"
   floatingLabelText="Password"
   onChange={this.onInputChangePassword}
   value={this.state.password}
 />
 <TextField
   type="password"
   floatingLabelText="Confirm Password"
   onChange={this.onInputChangeConfirmPassword}
   value={this.state.confirmPassword}
 />
 */
