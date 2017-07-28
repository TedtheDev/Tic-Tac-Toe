import React, { Component } from 'react';
import ForgotPassword from '../components/forgot_password';
import { reduxForm } from 'redux-form';

class ForgotPasswordWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
    this.onSubmitResetPassword = this.onSubmitResetPassword.bind(this);
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
  }

  onInputChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  onSubmitResetPassword() {
    // axios call to reset pass
    console.log('onSubmitResetPassword', this.state.email)
  }

  render() {
    return (
      <div>
        <ForgotPassword
          handleSubmit={this.props.handleSubmit}
          onSubmitResetPassword={this.onSubmitResetPassword}
          onInputChangeEmail={this.onInputChangeEmail}
          emailValue={this.state.email}
          {...this.props}
        />
      </div>
    )
  }
}

const validate = (values, props) => {
  const errors = {};
  values.email = values.email || '';
  if(!values.email && values.email === '') {
    errors.email = 'Required';
  } else if(values.email.length > 0 && values.email.indexOf('@') === -1) {
    errors.email = 'Invalid Email: use @'
  }
  return errors;
}

export default reduxForm({
  form: 'ResetPasswordForm',
  validate
})(ForgotPasswordWrapper);
