import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const validate = (values, props) => {
  values = {username: props.username, password: props.password};
  const errors = {};
  const requiredFields = [ 'username', 'password' ];
  requiredFields.forEach(field => {
    if(!values[field] && values[field] === '') {
      errors[field] = 'Required';
    }
  })
  return errors;
}

const renderTextFieldPassword = ({input, label, meta: {touched, error}, ...custom}) => (
    <TextField
      {...input}
      type='password'
      floatingLabelText={label}
      floatingLabelStyle={{color:"#000000"}}
      underlineStyle={{color:"#000000"}}
      errorText={touched && error}
      value={custom.password}
      onChange={custom.onInputChangePassword}
      autoComplete="off"
      style={{width:"90%"}}
    />
)

const paperStyle = {
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems: "center",
  padding: "1rem"
}

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.renderTextField = this.renderTextField.bind(this);
    this.renderTextFieldPassword = this.renderTextFieldPassword.bind(this);
  }

  renderErrorMessage(errorMessage) {
    return (
      <div style={{color:"#f44336", margin:"5% 0% 1% 0%"}}>
        <strong>{errorMessage}</strong>
      </div>
    )
  }

   renderTextField = ({input, label, meta: {touched, error}, onInputChangeUsername, ...custom}) => {
      return (
        <TextField
          {...input}
          type='text'
          floatingLabelText={label}
          floatingLabelStyle={{color:"#000000"}}
          underlineStyle={{color:"#000000"}}
          errorText={touched && error}
          value={custom.username}
          onChange={onInputChangeUsername}
          autoComplete="off"
          style={{width:"90%"}}
        />
      )
  }

  renderTextFieldPassword = ({input, label, meta: {touched, error}, ...custom}) => {
      return (<TextField
        {...input}
        type='password'
        floatingLabelText={label}
        floatingLabelStyle={{color:"#000000"}}
        underlineStyle={{color:"#000000"}}
        errorText={touched && error}
        value={custom.password}
        onChange={custom.onInputChangePassword}
        autoComplete="off"
        style={{width:"90%"}}
      />
    )
  }

  render() {
    const { handleSubmit, onLoginSubmit, username, onInputChangeUsername, password, onInputChangePassword, errorMessage } = this.props;
    return (
      <form onSubmit={ handleSubmit(onLoginSubmit) }>
        <Paper zDepth={5} style={paperStyle}>
          <Field name='username' username={username} onInputChangeUsername={onInputChangeUsername} component={this.renderTextField} label='Username' />
          <Field name='password' password={password} onInputChangePassword={onInputChangePassword} component={this.renderTextFieldPassword} label='Password' />
          {this.renderErrorMessage(errorMessage) }
          <div style={{display:"flex", flexDirection:"row", margin:"3%"}}>
              <RaisedButton type='submit' primary={true} label='Login' onSubmit={ handleSubmit(onLoginSubmit) } />
              <Link to='/resetpassword'>
                <RaisedButton type='button' secondary={true} label='Forgot Password' labelStyle={{fontSize:".6rem"}}/>
              </Link>
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
