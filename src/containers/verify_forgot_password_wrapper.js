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
    this.state = {
      password: '',
      confirmPassword: '',
      resetting: false,
      didReset: false,
      errorReset: false,
      alreadyResetPassword: false
     };

    // bind function to this
    this.onSubmitVerifyResetPassword = this.onSubmitVerifyResetPassword.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onInputChangeConfirmPassword = this.onInputChangeConfirmPassword.bind(this);
  }

  componentDidMount() {
    // axios call to verify token

    //get search object from history on react router
    const { search } = this.props.history.location;

    //get substring of the query string on the URL
    const token = search.substring(search.indexOf('=') + 1);
    //request to API to check if token exists and player
    // has not already reset their password
    axios.post(
      '/api/resetpassword/token',
      { token: token }
    )
      .then((data) => {
        //check success if false, false meaning token is not found
        if(!data.data.success) {
          // set alreadyResetPassword to true to trigger message and redirect to home
          this.setState({ alreadyResetPassword: true });
        }
      })
      .catch((err) => console.log('Error getting token from database: ' + err));
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
<<<<<<< HEAD
      `./api/resetpassword/update`,
=======
      `/api/resetpassword/update`,
>>>>>>> release1.4.1
      { password: this.state.password, token: token}
    )
    .then((res) => {
      if(res.data.success) {
        this.setState({ resetting: false, didReset: true, errorReset: false });
      } else {
        this.setState({ resetting: false, errorReset: true, didReset: false})
      }

    })
    .catch(() => this.setState({ resetting: false, errorReset: true}))
  }

  render() {
    return (
      <div>
        <VerifyForgotPassword
          onSubmitVerifyResetPassword={this.onSubmitVerifyResetPassword}
          handleSubmit={this.props.handleSubmit}
          onInputChangePassword={this.onInputChangePassword}
          onInputChangeConfirmPassword={this.onInputChangeConfirmPassword}
          passwordValue={this.state.password}
          confirmPasswordValue={this.state.confirmPassword}
          resetting={this.state.resetting}
          didReset={this.state.didReset}
          errorReset={this.state.errorReset}
          alreadyResetPassword={this.state.alreadyResetPassword}
          {...this.props}
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
