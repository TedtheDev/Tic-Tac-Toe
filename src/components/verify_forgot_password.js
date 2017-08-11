import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

// function to return TextField component from material-ui to render
// in redux form's Field component
const renderTextField = ({input, theValue, label, meta: {touched, error}, onInputChange}) => {
    input.onChange = onInputChange;
    input.value = theValue;
    return (
      <TextField
        {...input}
        type='password'
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

// Presentational component to show Update Password when player verifies
// through email sent from forgot password component
const VerifyForgotPassword = (props) => {
  //if password already reset, redirect to home '/'
  if(props.alreadyResetPassword) {
    props.history.push('/');
  }

  if(props.resetting && !props.didReset && !props.errorReset) {
    return (
      <div>Resetting...</div>
    );
  } else if(!props.resetting && props.didReset && !props.errorReset) {
    return (
      <div>
        <div>Password was successfully updated</div>
      </div>
    )
  } else {
    <div>Error Resetting</div>
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit(props.onSubmitVerifyResetPassword)}>
        <Paper zDepth={5} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <h2>Update Your Password</h2>
          <Field
            name='password'
            label='Password'
            component={renderTextField}
            onInputChange={props.onInputChangePassword}
            theValue={props.passwordValue}
          />
          <Field
            name='confirmPassword'
            label='Confirm Password'
            component={renderTextField}
            onInputChange={props.onInputChangeConfirmPassword}
            theValue={props.confirmPasswordValue}
           />
          <RaisedButton
            type="submit"
            label="Update Password"
            style={{marginTop:"10%"}}
            primary={true}
          />
        </Paper>
      </form>
    </div>
  )
}

export default VerifyForgotPassword;
