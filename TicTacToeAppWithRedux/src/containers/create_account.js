import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPlayer } from '../actions/index';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { reduxForm } from 'redux-form';
import CreateAccountForm from './create_account_form'

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
    event.preventDefault();
    const newPlayer = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
    };

    this.props.createPlayer(newPlayer);
      this.context.router.push('/play');

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

  render() {
    return(
      <div className="create-account">
        <h2>Create Your Account</h2>
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
        />
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    isCreating: state.account.isCreating,
    created: state.account.created
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createPlayer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
