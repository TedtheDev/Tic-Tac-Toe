import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form';

const renderTextField = ({input, emailValue, label, meta: {touched, error}, onInputChangeEmail}) => {
    input.onChange = onInputChangeEmail;
    input.value = emailValue;
    return (
      <TextField
        {...input}
        type='text'
        floatingLabelText={label}
        floatingLabelStyle={{color:"#000000"}}
        errorText={touched && error}
        underlineStyle={{color:"#000000"}}
        onChange={onInputChangeEmail}
        value={emailValue}
        autoComplete="off"
        style={{width:"90%"}}
      />
    );
}

const ForgotPassword = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmitResetPassword)}>
      <Paper zDepth={5} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2>Reset Your Password</h2>
        <Field
          name='email'
          label='Email'
          component={renderTextField}
          onInputChangeEmail={props.onInputChangeEmail}
          emailValue={props.emailValue}
        />
        <RaisedButton
          label='Reset Password'
          primary={true}
          style={{marginTop:"10%"}}
          type='submit'
        />
      </Paper>
    </form>
  )
}
export default ForgotPassword;
