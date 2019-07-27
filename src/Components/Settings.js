import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  CHANGE_SETTING_FIELD,
  SETTINGS_LOADED,
  SETTINGS_UNLOADED,
  SETTINGS_SAVED,
  PASSWORD_SAVED
} from "../constants/actionTypes";
import { openSnack } from "../actions";
import agent from "../agent.js";

const mapStateToProps = state => ({ ...state.settings });
const mapDispatchToProps = dispatch => {
  return {
    onSettingsChange: (event, field) =>
      dispatch({
        type: CHANGE_SETTING_FIELD,
        field,
        payload: event.target.value
      }),
    onLoad: payload => dispatch({ type: SETTINGS_LOADED, payload }),
    onUnload: () => dispatch({ type: SETTINGS_UNLOADED }),
    onPasswordSave: (oldPass, newPass) =>
      dispatch({
        type: PASSWORD_SAVED,
        payload: agent.User.updatePassword(oldPass, newPass)
      }),
    onCredentialsSave: payload =>
      dispatch({
        type: SETTINGS_SAVED,
        payload
      }),
    openSnack: (type, message) => dispatch(openSnack(type, message))
  };
};

const styles = theme => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    marginBottom: 32
  },
  accountSettings: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
    marginLeft: "15px"
  }
});

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      error: ""
    };
  }
  componentDidMount() {
    this.props.onLoad(agent.User.current());
  }
  componentWillUnmount() {
    this.props.onUnload();
  }
  updateCredetials = async () => {
    try {
      this.props.onCredentialsSave(
        agent.User.updateCredetials({
          phone: this.props.phone,
          phone2: this.props.phone2,
          email: this.props.email,
          password: this.props.mailPass
        })
      );
      this.props.openSnack("success", "Данные обновлены");
    } catch (e) {
      this.props.openSnack("error", "Возникла ошибка, повторите позже");
    }
  };
  updatePassword = async () => {
    const { oldPass, newPass, repeatPass, openSnack } = this.props;
    if (newPass === repeatPass) {
      try {
        await this.props.onPasswordSave(oldPass, newPass);
        openSnack("success", "Настройки изменены");
      } catch (e) {
        openSnack("error", "Возникла ошибка, повторите позже");
      }
    } else {
      this.setState({ error: "Пароли не совпадают" });
    }
  };

  comparePasswords = () => {
    if (this.props.newPass === this.props.repeatPass) {
      return this.setState({ error: "" });
    }
  };
  render() {
    const {
      classes,
      onSettingsChange,
      phone,
      phone2,
      mailPass,
      email,
      oldPass,
      newPass,
      repeatPass
    } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Typography variant="h5" gutterBottom>
            Настройки контактов
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <TextField
              id="admin-new-phone"
              label="Первый телефон"
              margin="dense"
              onChange={event => onSettingsChange(event, "phone")}
              value={phone}
              variant="filled"
            />
            <TextField
              id="admin-new-phone2"
              label="Второй телефон"
              margin="dense"
              onChange={event => onSettingsChange(event, "phone2")}
              value={phone2}
              variant="filled"
            />
            <TextField
              id="admin-new-email"
              label="Новый Email"
              margin="dense"
              onChange={event => onSettingsChange(event, "email")}
              type="email"
              value={email}
              variant="filled"
            />
            <TextField
              id="admin-new-mail-pass"
              label="Новый пароль почты"
              margin="dense"
              onChange={event => onSettingsChange(event, "mailPass")}
              type="password"
              value={mailPass}
              variant="filled"
            />
            <Button
              color="primary"
              className={classes.button}
              onClick={this.updateCredetials}
            >
              Применить
            </Button>
          </Paper>
          <Typography variant="h5" gutterBottom>
            Настройки Аккаунта
          </Typography>
          <Paper className={classes.paper} elevation={2}>
            <TextField
              id="admin-old-account-pass"
              label="Старый пароль"
              margin="dense"
              onChange={event => onSettingsChange(event, "oldPass")}
              type="password"
              value={oldPass}
              variant="filled"
            />
            <TextField
              id="admin-new-account-pass"
              label="Новый пароль"
              value={newPass}
              onChange={event => onSettingsChange(event, "newPass")}
              margin="dense"
              type="password"
              variant="filled"
            />
            <TextField
              error={this.state.error ? this.state.error : false}
              id="repeatpass"
              value={repeatPass}
              onChange={e => onSettingsChange(e, "repeatPass")}
              onBlur={this.comparePasswords}
              label={this.state.error ? this.state.error : "Повторите пароль"}
              margin="normal"
              variant="filled"
              type="password"
            />
            <Button
              color="primary"
              className={classes.button}
              onClick={this.updatePassword}
            >
              Применить
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings));
