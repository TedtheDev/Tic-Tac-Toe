import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form';

const renderTextField = ({input, theValue, label, meta: {touched, error}, onInputChange}) => {
    input.onChange = onInputChange;
    input.value = theValue;
    return (
      <TextField
        {...input}
        type='text'
        floatingLabelText={label}
        floatingLabelStyle={{color:"#000000"}}
        errorText={touched && error}
        underlineStyle={{color:"#000000"}}
        onChange={onInputChange}
        value={theValue}
        autoComplete="off"
        style={{width:"90%"}}
      />
    );
}

const ForgotPassword = (props) => {
  if(props.isFetching) {
    return (
      <div>Sending Confirmation Email...</div>
    )
  }

  if(props.didResetPassword) {
    return (
      <div>Confirmation sent!</div>
    )
  }

  return (
    <form onSubmit={props.handleSubmit(props.onSubmitResetPassword)}>
      <Paper zDepth={5} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2>Reset Your Password</h2>
        <Field
          name='username'
          label='Username'
          component={renderTextField}
          onInputChange={props.onInputChangeUsername}
          theValue={props.usernameValue}
        />
        <Field
          name='email'
          label='Email'
          component={renderTextField}
          onInputChange={props.onInputChangeEmail}
          theValue={props.emailValue}
        />
        <strong style={{color:"red", marginTop:"2%"}}>{props.errorMessage}</strong>
        <RaisedButton
          label='Reset Password'
          primary={true}
          style={{marginTop:"5%"}}
          type='submit'
        />
      </Paper>
    </form>
  )
}
export default ForgotPassword;
