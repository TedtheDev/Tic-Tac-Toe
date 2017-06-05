import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPlayer, loginPlayer } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { reduxForm } from 'redux-form';
import CreateAccountForm from './create_account_form'
import LoadingCircle from '../components/loadingMaterialUICircular';
import AccountSettings from './account_settings';
import UpdateAccount from './update_account'

class CreateAccount extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

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

  onSubmitCreateAccount(event) {
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
      this.setState({ firstName: event.target.value });
  }
  onInputChangeLastName(event) {
      this.setState({ lastName: event.target.value });
  }
  onInputChangeEmail(event) {
      this.setState({ email: event.target.value });
  }
  onInputChangeUsername(event) {
      this.setState({ username: event.target.value });
  }
  onInputChangePassword(event) {
      this.setState({ password: event.target.value });
  }
  onInputChangeConfirmPassword(event) {
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

    if(this.props.isAuthenticated && this.props.created) {
      return (
        <Redirect to="/play" push />
      )
    }

    return(
      <div className="create-account">
        <CreateAccountForm
          onSubmitCreateAccount={this.onSubmitCreateAccount}
          onInputChangeFirstName={this.onInputChangeFirstName}
          firstName={this.state.firstName}
          onInputChangeLastName={this.onInputChangeLastName}
          lastName={this.state.lastName}
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
    errorMessage: state.account.errorMessage,
    isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createPlayer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
