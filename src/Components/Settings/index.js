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
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import {
  setUpdateAdminEmail,
  setUpdateAdminMailPass,
  setUpdateAdminAccountPassOld,
  setUpdateAdminAccountPassNew,
  setUpdateAdminAccountPassRepeat,
  setUpdateAdminPhone,
  resetEmailSettingsField,
  resetAccountSettingsField,
  openEmailUpdateSuccessPopUp,
  closeEmailUpdateSuccessPopUp,
  openAccountUpdateSuccessPopUp,
  closeAccountUpdateSuccessPopUp,
  openSettingsSuccessPopUp,
  closeSettingsSuccessPopUp
} from "../../actions";

const mapStateToProps = state => {
  return {
    updateAdminEmailField: state.changeAdminInputs.updateAdminEmailField,
    updateAdminMailPassField: state.changeAdminInputs.updateAdminMailPassField,
    updateAdminAccountPassOldField:
      state.changeAdminInputs.updateAdminAccountPassOldField,
    updateAdminAccountPassNewField:
      state.changeAdminInputs.updateAdminAccountPassNewField,
    updateAdminAccountPassRepeatField:
      state.changeAdminInputs.updateAdminAccountPassRepeatField,
    updateAdminPhoneField: state.changeAdminInputs.updateAdminPhoneField,

    snackSettings: state.handleSnackbars.snackSettings
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
    onUpdateAdminPhone: event =>
      dispatch(setUpdateAdminPhone(event.target.value)),

    onResetAdminEmailSettings: () => dispatch(resetEmailSettingsField()),
    onResetAdminAccountSettings: () => dispatch(resetAccountSettingsField()),

    onEmailSettingsUpdateSuccess: () => dispatch(openEmailUpdateSuccessPopUp()),
    onEmailSettingsUpdateSuccessClose: () =>
      dispatch(closeEmailUpdateSuccessPopUp()),
    onAccountSettingsUpdateSuccess: () =>
      dispatch(openAccountUpdateSuccessPopUp()),
    onAccountSettingsUpdateSuccessClose: () =>
      dispatch(closeAccountUpdateSuccessPopUp()),

    onSettingsSuccess: () => dispatch(openSettingsSuccessPopUp()),
    onSettingsSuccessClose: () => dispatch(closeSettingsSuccessPopUp())
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
    marginTop: 50,
    overflowY: "scroll" // So the Typography noWrap works
  }
});

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      error: ""
    };
  }
  updateEmailSettings = () => {
    fetch(`${BACKEND_URI}/updateemailcredentials`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: "admin",
        email: this.props.updateAdminEmailField,
        password: this.props.updateAdminMailPassField
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onSettingsSuccess())
      .then(() => this.props.onEmailSettingsUpdateSuccess())
      .then(() => this.props.onResetAdminEmailSettings());
  };
  updateAccountSettings = () => {
    if (
      this.props.updateAdminAccountPassNewField ===
      this.props.updateAdminAccountPassRepeatField
    ) {
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
        .then(() => this.props.onSettingsSuccess())
        .then(() => this.props.onAccountSettingsUpdateSuccess())
        .then(() => this.props.onResetAdminAccountSettings());
      this.setState({ error: "" });
    } else {
      this.setState({ error: "Пароли не совпадают" });
    }
  };
  render() {
    const {
      classes,
      theme,
      onUpdateAdminEmail,
      onUpdateAdminMailPass,
      onUpdateAdminAccountPassNew,
      onUpdateAdminAccountPassOld,
      onUpdateAdminAccountPassRepeat,
      onUpdateAdminPhone
    } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction="column" justify="start">
          <Grid item xs={4}>
            <Paper className="contactsSettings">
              <Typography variant="h5" gutterBottom>
                Настройки контактов
              </Typography>
              <TextField
                id="admin-new-phone"
                label="Новый телефон"
                margin="dense"
                onChange={onUpdateAdminPhone}
                value={this.props.updateAdminPhoneField}
              />
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
                label="Новый пароль почты"
                margin="dense"
                onChange={onUpdateAdminMailPass}
                type="password"
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
            {this.state.error === "" ? (
              <Paper className="accountSettings">
                <Typography variant="h5" gutterBottom>
                  Настройки Аккаунта
                </Typography>
                <TextField
                  id="admin-old-account-pass"
                  label="Старый пароль"
                  margin="dense"
                  onChange={onUpdateAdminAccountPassOld}
                  type="password"
                  value={this.props.updateAdminAccountPassOldField}
                />
                <TextField
                  id="admin-new-account-pass"
                  label="Новый пароль"
                  margin="dense"
                  onChange={onUpdateAdminAccountPassNew}
                  type="password"
                  value={this.props.updateAdminAccountPassNewField}
                />
                <TextField
                  id="admin-repeat-account-pass"
                  label="Повторите пароль"
                  margin="dense"
                  onChange={onUpdateAdminAccountPassRepeat}
                  type="password"
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
            ) : (
              <Paper className="accountSettings">
                <Typography variant="h5" gutterBottom>
                  Настройки Аккаунта
                </Typography>
                <TextField
                  id="admin-old-account-pass"
                  label="Старый пароль"
                  margin="dense"
                  onChange={onUpdateAdminAccountPassOld}
                  type="password"
                  value={this.props.updateAdminAccountPassOldField}
                />
                <FormControl
                  className={classes.formControl}
                  error
                  aria-describedby="component-error-text"
                >
                  <InputLabel htmlFor="admin-new-account-pass">
                    Новый пароль
                  </InputLabel>
                  <Input
                    id="admin-new-account-pass"
                    value={this.props.updateAdminAccountPassNewField}
                    onChange={onUpdateAdminAccountPassNew}
                    margin="dense"
                    type="password"
                  />
                  <FormHelperText id="component-error-text">
                    Ошибка
                  </FormHelperText>
                </FormControl>

                <FormControl
                  className={classes.formControl}
                  error
                  aria-describedby="component-error-text"
                >
                  <InputLabel htmlFor="admin-repeat-account-pass">
                    Повторите пароль
                  </InputLabel>
                  <Input
                    id="admin-repeat-account-pass"
                    value={this.props.updateAdminAccountPassRepeatField}
                    onChange={onUpdateAdminAccountPassRepeat}
                    margin="dense"
                    type="password"
                  />
                  <FormHelperText id="component-error-text">
                    Ошибка
                  </FormHelperText>
                </FormControl>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.updateAccountSettings}
                >
                  Применить
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackSettings}
          autoHideDuration={6000}
          onClose={this.props.onSettingsSuccessClose}
          ContentProps={{ "aria-describedby": "message-id" }}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onSettingsSuccessClose}
            variant="success"
            message="Настройки изменены"
          />
        </Snackbar>
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
