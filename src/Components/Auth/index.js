import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BACKEND_URI } from "../../constants.js";
import { setPasswordField } from "./actions";
import { ON_CORRECT_RESPONSE, ON_WRONG_RESPONSE } from "./constants.js";

const mapStateToProps = state => {
  return {
    passwordField: state.authReducer.passwordField
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdatePasswordField: event =>
      dispatch(setPasswordField(event.target.value)),
    onCorrectResponse: () =>
      dispatch({ type: ON_CORRECT_RESPONSE, payload: true }),
    onWrongResponse: () => dispatch({ type: ON_WRONG_RESPONSE, payload: true })
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
  login = () => {
    fetch(`${BACKEND_URI}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: "admin",
        password: this.props.passwordField
      })
    })
      .then(response => response.json())
      .then(response => {
        response !== null ? this.props.onCorrectResponse() : this.props.onWrongResponse();
      })
      .catch(err => console.log(err));
  };
  render() {
    const { classes, onUpdatePasswordField } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="password"
          label="Пароль"
          margin="dense"
          type="password"
          onChange={onUpdatePasswordField}
          value={this.props.passwordField}
        />
        <Button color="primary" className={classes.button} onClick={this.login}>
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
