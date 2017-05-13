import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPlayer } from '../actions/index';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

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
        <form onSubmit={this.onSubmitCreateAccount}>
          <Paper>
            <TextField
              type="text"
              floatingLabelText="First Name"
              onChange={this.onInputChangeFirstName}
              value={this.state.firstName}
            />
            <TextField
              type="text"
              floatingLabelText="Last Name"
              onChange={this.onInputChangeLastName}
              value={this.state.lastName}
            />
            <TextField
              type="text"
              floatingLabelText="Email"
              onChange={this.onInputChangeEmail}
              value={this.state.email}
            />
            <TextField
              type="text"
              floatingLabelText="Username"
              onChange={this.onInputChangeUsername}
              value={this.state.username}
            />
            <TextField
              type="password"
              floatingLabelText="Password"
              onChange={this.onInputChangePassword}
              value={this.state.password}
            />
            <TextField
              type="password"
              floatingLabelText="Confirm Password"
              onChange={this.onInputChangeConfirmPassword}
              value={this.state.confirmPassword}
            />
            <RaisedButton type="submit" primary={true} label='Create Account' />
          </Paper>
        </form>
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
