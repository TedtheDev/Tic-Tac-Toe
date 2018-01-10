import React, { Component } from 'react';
import ForgotPassword from '../components/forgot_password';
import { reduxForm } from 'redux-form';
import axios from 'axios';

class ForgotPasswordWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', username: '', isFetching: false, didResetPassword: false, errorMessage: ''};
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
    this.setState({isFetching: true, errorMessage: ''})
    const body = { email: this.state.email, username: this.state.username}
    axios.post('/api/resetpassword', body)
      .then((data) => {
        if(data.data.success) {
          this.setState({didResetPassword: true, isFetching: false, errorMessage:''})
        } else {
          this.setState({didResetPassword: false, isFetching: false, errorMessage:'Username or Email invalid'})
        }
      })
      .catch((err) => console.log(err) )

  }

  render() {
    return (
      <div>
        <ForgotPassword
          handleSubmit={this.props.handleSubmit}
          onSubmitResetPassword={this.onSubmitResetPassword}
          onInputChangeEmail={this.onInputChangeEmail}
          onInputChangeUsername={this.onInputChangeUsername}
          emailValue={this.state.email}
          usernameValue={this.state.username}
          errorMessage={this.state.errorMessage}
          isFetching={this.state.isFetching}
          didResetPassword={this.state.didResetPassword}
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
