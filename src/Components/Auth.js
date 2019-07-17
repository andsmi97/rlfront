import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from "../constants/actionTypes";
import agent from "../agent";

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => {
  return {
    onChangeEmail: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
    onChangePassword: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
    onSubmit: (email, password) =>
      dispatch({ type: LOGIN, payload: agent.User.login(email, password) }),
    onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED })
  };
};

const styles = theme => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

class Auth extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  render() {
    const { classes, error, email, password } = this.props;

    return (
      <form
        onSubmit={this.submitForm(email, password)}
        className={classes.root}
      >
        <TextField
          id="user"
          label="Логин"
          margin="normal"
          type="username"
          value={email}
          onChange={this.changeEmail}
          className={classes.textField}
        />

        {!error ? (
          <TextField
            id="password"
            label="Пароль"
            margin="normal"
            type="password"
            value={password}
            onChange={this.changePassword}
            className={classes.textField}
          />
        ) : (
          <TextField
            error
            id="standard-error"
            label={error}
            margin="normal"
            type="password"
            defaultValue={password}
            onChange={this.changePassword}
            className={classes.textField}
          />
        )}
        {error}
        <Button color="primary" className={classes.button} type="submit">
          Войти
        </Button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Auth));
