import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BACKEND_URI } from "../../constants.js";
import { setPasswordField } from "./actions";
import { ON_CORRECT_RESPONSE, ON_WRONG_RESPONSE } from "./constants.js";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapStateToProps = state => {
  return {
    passwordField: state.authReducer.passwordField,
    error: state.authReducer.error,
    pending: state.appReducer.authPending
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdatePasswordField: event =>
      dispatch(setPasswordField(event.target.value)),
    onCorrectResponse: () =>
      dispatch({ type: ON_CORRECT_RESPONSE, payload: true }),
    onWrongResponse: err => dispatch({ type: ON_WRONG_RESPONSE, payload: err }),
    
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
  }
});

class Auth extends React.Component {
  saveAuthTokenInSessions = token => {
    window.localStorage.setItem("token", token);
  };
  onSubmitSignIn = () => {
    fetch(`${BACKEND_URI}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: this.props.passwordField
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success === "true") {
          this.saveAuthTokenInSessions(data.token);
          this.props.onCorrectResponse();
        }else{
          this.props.onWrongResponse("Введены неправильные данные");
        }
      })
      .catch(err => this.props.openSnack('error','Возникла ошибка, повторите позже'));
  };
  render() {
    const { classes, onUpdatePasswordField, error, pending } = this.props;

    return pending ? (
      <div className={classes.root}>
        <CircularProgress className={classes.progress} />
      </div>
    ) : (
      <div className={classes.root}>
        <TextField
          id="user"
          label="Логин"
          margin="dense"
          type="username"
          value="admin"
          onChange={onUpdatePasswordField}
        />
        {!error ? (
          <TextField
            id="password"
            label="Пароль"
            margin="dense"
            type="password"
            onChange={onUpdatePasswordField}
            value={this.props.passwordField}
          />
        ) : (
          <TextField
            error
            id="standard-error"
            label={error}
            margin="dense"
            type="password"
            defaultValue={this.props.passwordField}
            onChange={onUpdatePasswordField}
            className={classes.textField}
          />
        )}
        {error}
        <Button
          color="primary"
          className={classes.button}
          onClick={this.onSubmitSignIn}
        >
          Войти
        </Button>
      </div>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Auth));
