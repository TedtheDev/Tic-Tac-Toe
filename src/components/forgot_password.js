import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form';

const renderTextField = ({input, label, theType, meta: {touched, error}, onInputChange, theValue, ...custom}) => {
    return (
      <TextField
        type='text'
        floatingLabelText="Email"
        floatingLabelStyle={{color:"#000000"}}
        underlineStyle={{color:"#000000"}}
        autoComplete="off"
        style={{width:"90%"}}
      />
    );
}

const ForgotPassword = ({ values, handleSubmit, onSubmitResetPassword }) => {
  return (
    <form onSumbit={handleSubmit(onSubmitResetPassword)}>
      <Paper zDepth={5} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2>Reset Your Password</h2>
        <Field name='email' type='text' label='Email' component={renderTextField} />
        <RaisedButton
          label='Reset Password'
          primary={true}
          style={{}}
          type='submit'
        />
      </Paper>
    </form>
  )
}
export default ForgotPassword;
