import React, { Component } from 'react';
import ForgotPassword from '../components/forgot_password';
import { reduxForm } from 'redux-form';
import axios from 'axios';

class ForgotPasswordWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', username: '', isFetching: false, didResetPassword: false};
    this.onSubmitResetPassword = this.onSubmitResetPassword.bind(this);
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
  }

  onInputChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  onInputChangeUsername(event) {
    if(event.target.value.length <= 75) {
      this.setState({username: event.target.value})
    }
  }

  onSubmitResetPassword() {
    // axios call to reset pass
    this.setState({isFetching: true})
    const body = { email: this.state.email, username: this.state.username}
    axios.post('http://localhost:3050/api/resetpassword', body)
      .then((data) => {
        console.log(data.data)
        if(data.data.success) {
          this.setState({didResetPassword: true, isFetching: false})
        } else {
          this.setState({didResetPassword: false, isFetching: false})
        }
      })
      .catch((err) => console.log(err) )

  }

  render() {
    if(this.state.isFetching) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <ForgotPassword
          handleSubmit={this.props.handleSubmit}
          onSubmitResetPassword={this.onSubmitResetPassword}
          onInputChangeEmail={this.onInputChangeEmail}
          onInputChangeUsername={this.onInputChangeUsername}
          emailValue={this.state.email}
          usernameValue={this.state.username}
          {...this.props}
        />
      </div>
    )
  }
}

const validate = (values, props) => {
  const errors = {};
  values.email = values.email || '';
  values.username = values.username || '';
  if(!values.email && values.email === '') {
    errors.email = 'Required';
  } else if(values.email.length > 0 && values.email.indexOf('@') === -1) {
    errors.email = 'Invalid Email: use @';
  }

  if(!values.username && values.username === '') {
    errors.username = "Required";
  }

  return errors;
}

export default reduxForm({
  form: 'ResetPasswordForm',
  validate
})(ForgotPasswordWrapper);
