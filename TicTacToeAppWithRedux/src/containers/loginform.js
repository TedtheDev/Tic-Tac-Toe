import React from 'react';
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

const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
    <TextField
      type='text'
      floatingLabelText={label}
      errorText={touched && error}
      value={custom.username}
      onChange={custom.onInputChangeUsername}
      {...input}
    />
)

const renderTextFieldPassword = ({input, label, meta: {touched, error}, ...custom}) => (
    <TextField
      type='password'
      floatingLabelText={label}
      errorText={touched && error}
      value={custom.password}
      onChange={custom.onInputChangePassword}
      {...input}
    />
)

const paperStyle = {
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
  //background:"#00bcd4"
}

const LoginForm = (props) => {
  const { handleSumbit, username, onInputChangeUsername, password, onInputChangePassword } = props;
  return (
    <form onSubmit={ handleSumbit }>
      <Paper zDepth={5} style={paperStyle}>
        <Field name='username' username={username} onInputChangeUsername={onInputChangeUsername} component={renderTextField} label='Username' />
        <Field name='password' password={password} onInputChangePassword={onInputChangePassword} component={renderTextFieldPassword} label='Password' />
      </Paper>
      <RaisedButton type='submit' primary={true} label='Login' />
    </form>
  )

}

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm)
