import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
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
  const { handleSubmit, onLoginSubmit, username, onInputChangeUsername, password, onInputChangePassword } = props;
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

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm)
