import React, { Component } from 'react';
import ForgotPassword from '../components/forgot_password';
import { reduxForm, Field } from 'redux-form';

const validate = (values, props) => {
  const errors = {};
  if(!values['email'] && values['email'] === '') {
    errors['email'] = 'Required';
  } else if(values['email'].length > 0 && values['email'].indexOf('@') === -1) {
    errors['email'] = 'Invalid Email: use @'
  }
  return errors;
}

class ForgotPasswordWrapper extends Component {
  constructor(props) {
    super(props);

    this.onSubmitResetPassword = this.onSubmitResetPassword.bind(this);
  }

  onSubmitResetPassword() {
    // axios call to reset pass
  }

  render() {
    return (
      <div>
        <ForgotPassword
          values={values}
          onSubmitResetPassword={this.onSubmitResetPassword}
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'ResetPasswordForm',
  validate
})(ForgotPasswordWrapper);
