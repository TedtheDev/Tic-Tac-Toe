import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import VerifyForgotPassword from '../components/verify_forgot_password';

// Wrapper component to hold all logic to verify player's
// reset password and update it via an API call when validated
class VerifyForgotPasswordWrapper extends Component {
  constructor(props) {
    super(props);

    // set state to handle the player's password and
    // another field to confirm password
    this.state = { password: '', confirmPassword: '', resetting: false, didReset: false, errorReset: false };

    // bind function to this
    this.onSubmitVerifyResetPassword = this.onSubmitVerifyResetPassword.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onInputChangeConfirmPassword = this.onInputChangeConfirmPassword.bind(this);
  }

  // function to change value on password field and state
  // controlled component
  onInputChangePassword(event) {
    if(event.target.value.length <= 75) {
      this.setState({password: event.target.value});
    }
  }

  // function to change value on confirm password field and state
  // controlled component
  onInputChangeConfirmPassword(event) {
    if(event.target.value.length <= 75) {
      this.setState({confirmPassword: event.target.value});
    }
  }

  // function to submit password and confirm password to API call
  onSubmitVerifyResetPassword() {
    // axios calll
    this.setState({ resetting: true })
    const { search } = this.props.history.location;
    const token = search.substring(search.indexOf('=') + 1);
    axios.post(
      `http://localhost:3050/api/resetpassword/update`,
      { password: this.state.password, token: token}
    )
    .then((res) => {
      if(res.data.success) {
        this.setState({ resetting: false, didReset: true });
      } else {
        this.setState({ resetting: false, errorReset: true})
      }

    })
    .catch(() => this.setState({ resetting: false, errorReset: true}))
  }

  render() {
    if(this.state.resetting ) {
      return (
        <div>Resetting...</div>
      );
    } else if(!this.state.resetting && this.state.didReset && !this.state.errorReset) {
      return (
        <div>Password was successfully updated</div>
      )
    } else {
      <div>Error Resetting</div>
    }

    return (
      <div>
        <VerifyForgotPassword
          onSubmitVerifyResetPassword={this.onSubmitVerifyResetPassword}
          handleSubmit={this.props.handleSubmit}
          onInputChangePassword={this.onInputChangePassword}
          onInputChangeConfirmPassword={this.onInputChangeConfirmPassword}
          passwordValue={this.state.password}
          confirmPasswordValue={this.state.confirmPassword}
        />
      </div>
    )
  }
}

// validate function to handle user input
// on two fields 'password' and 'confirm password';
// validate is used in redux form as per the docs
const validate = (values, props) => {
  let errors = {};

  //set values to '' if not defined
  values.password = values.password || '';
  values.confirmPassword = values.confirmPassword || '';

  //check if values are not unefined and if they are not empty string
  if(
    values.password &&
    values.confirmPassword &&
    values.password.length > 0 &&
    values.confirmPassword.length > 0
  ) {
    //check if password and confirm password are not equal to each other
    if(values.password !== values.confirmPassword) {
      // when not equal to each other, see errors to passwords to not match
      const passwordsError = 'Password do not match';
      errors.confirmPassword = passwordsError;
      errors.password = passwordsError;
    }
  } else {
    // if password is empty string, set error to Required
    if(values.password === '') {
      errors.password = 'Required'
    }

    // if confirm password is empty string, set error to Required
    if(values.confirmPassword === '') {
      errors.confirmPassword = 'Required'
    }
  }

  //return errors to redux form
  return errors;
}

// export the component and use redux form
export default reduxForm({
  form: 'VerifyForgotPasswordForm',
  validate
})(VerifyForgotPasswordWrapper);
