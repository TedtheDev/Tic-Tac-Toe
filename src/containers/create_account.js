import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlayer } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import CreateAccountForm from './create_account_form'
import LoadingCircle from '../components/loading_material_ui_circular';
import AccountSettings from './account_settings';

class CreateAccount extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });

    this.onSubmitCreateAccount = this.onSubmitCreateAccount.bind(this);

    this.onInputChangeFirstName = this.onInputChangeFirstName.bind(this);
    this.onInputChangeLastName = this.onInputChangeLastName.bind(this);
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onInputChangeConfirmPassword = this.onInputChangeConfirmPassword.bind(this);
  }

  onSubmitCreateAccount() {
    const newPlayer = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
    };

    this.props.createPlayer(newPlayer);

  }

  onInputChangeFirstName(event) {
    if(event.target.value.length <= 75)
      this.setState({ firstName: event.target.value });
  }
  onInputChangeLastName(event) {
    if(event.target.value.length <= 75)
      this.setState({ lastName: event.target.value });
  }
  onInputChangeEmail(event) {
    if(event.target.value.length <= 75)
      this.setState({ email: event.target.value });
  }
  onInputChangeUsername(event) {
    if(event.target.value.length <= 75)
      this.setState({ username: event.target.value });
  }
  onInputChangePassword(event) {
    if(event.target.value.length <= 75)
      this.setState({ password: event.target.value });
  }
  onInputChangeConfirmPassword(event) {
    if(event.target.value.length <= 75)
      this.setState({ confirmPassword: event.target.value });
  }

  renderErrorMessage(errorMessage) {
    return (
      <div>{errorMessage}</div>
    )
  }

  render() {
    if(this.props.isCreating) {
      return (
        <LoadingCircle />
      )
    }

    if(this.props.created) {
      return (
        <div>
          <h1>Please verify your account via the email address you supplied.</h1>
        </div>
      )
    }

    return(
      <div className="create-account">
        <CreateAccountForm
          onSubmitCreateAccount={this.onSubmitCreateAccount}
          onInputChangeEmail={this.onInputChangeEmail}
          email={this.state.email}
          onInputChangeUsername={this.onInputChangeUsername}
          username={this.state.username}
          onInputChangePassword={this.onInputChangePassword}
          password={this.state.password}
          onInputChangeConfirmPassword={this.onInputChangeConfirmPassword}
          confirmPassword={this.state.confirmPassword}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    isCreating: state.account.isCreating,
    created: state.account.created,
    player: state.account.player,
    errorMessage: state.account.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createPlayer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
