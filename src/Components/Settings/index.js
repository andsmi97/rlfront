import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BACKEND_URI } from "../../constants.js";
import {
  setUpdateAdminEmail,
  setUpdateAdminMailPass,
  setUpdateAdminAccountPassOld,
  setUpdateAdminAccountPassNew,
  setUpdateAdminAccountPassRepeat,
  resetEmailSettingsField,
  resetAccountSettingsField,
  openEmailUpdateSuccessPopUp,
  closeEmailUpdateSuccessPopUp,
  openAccountUpdateSuccessPopUp,
  closeAccountUpdateSuccessPopUp,
} from "../../actions";

const mapStateToProps = state => {
  //fix it
  return {
    updateAdminEmailField: state.changeAdminInputs.updateAdminEmailField,
    updateAdminMailPassField: state.changeAdminInputs.updateAdminMailPassField,
    updateAdminAccountPassOldField:
      state.changeAdminInputs.updateAdminAccountPassOldField,
    updateAdminAccountPassNewField:
      state.changeAdminInputs.updateAdminAccountPassNewField,
    updateAdminAccountPassRepeatField:
      state.changeAdminInputs.updateAdminAccountPassRepeatField,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdateAdminEmail: event =>
      dispatch(setUpdateAdminEmail(event.target.value)),
    onUpdateAdminMailPass: event =>
      dispatch(setUpdateAdminMailPass(event.target.value)),
    onUpdateAdminAccountPassOld: event =>
      dispatch(setUpdateAdminAccountPassOld(event.target.value)),
    onUpdateAdminAccountPassNew: event =>
      dispatch(setUpdateAdminAccountPassNew(event.target.value)),
    onUpdateAdminAccountPassRepeat: event =>
      dispatch(setUpdateAdminAccountPassRepeat(event.target.value)),

    onResetAdminEmailSettings: () =>
    dispatch(resetEmailSettingsField()),
    onResetAdminAccountSettings: () =>
    dispatch(resetAccountSettingsField()),

    onEmailSettingsUpdateSuccess: () => dispatch(openEmailUpdateSuccessPopUp()),        
    onEmailSettingsUpdateSuccessClose: () => dispatch(closeEmailUpdateSuccessPopUp()),
    onAccountSettingsUpdateSuccess: () => dispatch(openAccountUpdateSuccessPopUp()),        
    onAccountSettingsUpdateSuccessClose: () => dispatch(closeAccountUpdateSuccessPopUp()),
  };
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    minWidth: 0,
    overflowY: "scroll" // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class Settings extends React.Component {
  updateEmailSettings = () => {
    fetch(`${BACKEND_URI}/updateemailcredentials`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({     
        user: "admin",
        email: this.props.updateAdminEmailField,
        passoword: this.props.updateAdminMailPassField
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onEmailSettingsUpdateSuccess())
      .then(() => this.props.onResetAdminEmailSettings());
  };
  updateAccountSettings = () => {
    fetch(`${BACKEND_URI}/changeaccountpassword`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({     
        user: "admin",
        currentPassword: this.props.updateAdminAccountPassOldField,
        newPassword: this.props.updateAdminAccountPassNewField
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onAccountSettingsUpdateSuccess())
      .then(() => this.props.onResetAdminAccountSettings());
  };
  render() {
    const {
      classes,
      theme,
      onUpdateAdminEmail,
      onUpdateAdminMailPass,
      onUpdateAdminAccountPassNew,
      onUpdateAdminAccountPassOld,
      onUpdateAdminAccountPassRepeat
    } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Paper class="emailSettings">
              <Typography variant="h4" gutterBottom>
                Настройки Email
              </Typography>
              <TextField
                id="admin-new-email"
                label="Новый Email"
                margin="dense"
                onChange={onUpdateAdminEmail}
                type="email"
                value={this.props.updateAdminEmailField}
              />
              <TextField
                id="admin-new-mail-pass"
                label="Новый пароль"
                margin="dense"
                onChange={onUpdateAdminMailPass}
                value={this.props.updateAdminMailPassField}
              />
              <Button
                color="primary"
                className={classes.button}
                onClick={this.updateEmailSettings}
              >
                Применить
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className="accountSettings">
              <Typography variant="h4" gutterBottom>
                Настройки Аккаунта
              </Typography>
              <TextField
                id="admin-old-account-pass"
                label="Старый пароль"
                margin="dense"
                onChange={onUpdateAdminAccountPassOld}
                value={this.props.updateAdminAccountPassOldField}
              />
              <TextField
                id="admin-new-account-pass"
                label="Новый пароль"
                margin="dense"
                onChange={onUpdateAdminAccountPassNew}
                value={this.props.updateAdminAccountPassNewField}
              />
              <TextField
                id="admin-repeat-account-pass"
                label="Повторите пароль"
                margin="dense"
                onChange={onUpdateAdminAccountPassRepeat}
                value={this.props.updateAdminAccountPassRepeatField}
              />
              <Button
                color="primary"
                className={classes.button}
                onClick={this.updateAccountSettings}
              >
                Применить
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </main>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings));
