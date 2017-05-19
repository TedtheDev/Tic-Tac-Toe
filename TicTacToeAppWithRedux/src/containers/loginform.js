import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'username', 'password' ];
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}

const renderTextField = ({input, label, meta: {touched, error}, onInputChangeUsername, ...custom}) => (
    <TextField
      {...input}
      type='text'
      floatingLabelText={label}
      errorText={touched && error}
      value={custom.username}
      onChange={onInputChangeUsername}
    />
)

const renderTextFieldPassword = ({input, label, meta: {touched, error}, ...custom}) => (
    <TextField
      {...input}
      type='password'
      floatingLabelText={label}
      errorText={touched && error}
      value={custom.password}
      onChange={custom.onInputChangePassword}
    />
)

const paperStyle = {
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
  //background:"#00bcd4"
}

class LoginForm extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { handleSubmit, onLoginSubmit, username, onInputChangeUsername, password, onInputChangePassword } = this.props;
    return (
      <form onSubmit={ handleSubmit(onLoginSubmit) }>
        <Paper zDepth={5} style={paperStyle}>
          <Field name='username' username={username} onInputChangeUsername={onInputChangeUsername} component={renderTextField} label='Username' />
          <Field name='password' password={password} onInputChangePassword={onInputChangePassword} component={renderTextFieldPassword} label='Password' />
          <div style={{display:"flex", flexDirection:"row", margin:"3%"}}>
              <RaisedButton type='submit' primary={true} label='Login' />
              <RaisedButton type='button' secondary={true} label='Forgot Password' />
          </div>
        </Paper>
      </form>
    )
  }
}

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm)
