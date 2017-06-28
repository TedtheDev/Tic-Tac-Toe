import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePlayer } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import UpdateAccountForm from './update_account_form'
import LoadingCircle from '../components/loading_material_ui_circular';
import AccountSettings from './account_settings';

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      email: this.props.player.email,
      username: this.props.player.username,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

    this.onSubmitUpdateAccount = this.onSubmitUpdateAccount.bind(this);
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangeOldPassword = this.onInputChangeOldPassword.bind(this);
    this.onInputChangeNewPassword = this.onInputChangeNewPassword.bind(this);
    this.onInputChangeConfirmNewPassword = this.onInputChangeConfirmNewPassword.bind(this);
  }

  onSubmitUpdateAccount() {
    const player = {
        username: this.state.username,
        email: this.state.email,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
    };

    this.props.updatePlayer(player);

  }

  onInputChangeEmail(event) {
    if(event.target.value.length <= 75)
      this.setState({ email: event.target.value });
  }
  onInputChangeUsername(event) {
    if(event.target.value.length <= 75)
      this.setState({ username: event.target.value });
  }
  onInputChangeOldPassword(event) {
    if(event.target.value.length <= 75)
      this.setState({ oldPassword: event.target.value });
  }
  onInputChangeNewPassword(event) {
    if(event.target.value.length <= 75)
      this.setState({ newPassword: event.target.value });
  }
  onInputChangeConfirmNewPassword(event) {
    if(event.target.value.length <= 75)
      this.setState({ confirmNewPassword: event.target.value });
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
        <UpdateAccountForm
          onSubmitUpdateAccount={this.onSubmitUpdateAccount}
          onInputChangeEmail={this.onInputChangeEmail}
          email={this.state.email}
          onInputChangeUsername={this.onInputChangeUsername}
          username={this.state.username}
          onInputChangeOldPassword={this.onInputChangeOldPassword}
          oldPassword={this.state.oldPassword}
          onInputChangeNewPassword={this.onInputChangeNewPassword}
          newPassword={this.state.newPassword}
          onInputChangeConfirmNewPassword={this.onInputChangeConfirmNewPassword}
          confirmNewPassword={this.state.confirmNewPassword}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  };
};

function mapStateToProps(state){
  return {
    player: state.account.player,
    errorMessage: state.account.errorMessage,
    isCreating: state.account.isCreating
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePlayer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount)
