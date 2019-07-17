import React, { Component } from "react";
import Drawer from "./Components/Drawer";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Auth from "./Components/Auth";
import Snack from "./Components/Snack";
import { closeSnack } from "./actions";
import { Switch } from "react-router-dom";
import { APP_LOAD, REDIRECT } from "./constants/actionTypes";
import { store } from "./redux/store";
import { push } from "connected-react-router";
import agent from "./agent";
import Loader from "./Components/Loader";
import Routes from "./Components/Routes";
const styles = {
  "@global": {
    "*": {
      margin: 0,
      padding: 0
    }
  },
  root: {
    height: "100vh"
  }
};

const mapStateToProps = state => ({ ...state.common });
const mapDispatchToProps = dispatch => {
  return {
    onSnackClose: () => dispatch(closeSnack()),
    onLoad: (payload, token) =>
      dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () => dispatch({ type: REDIRECT })
  };
};
class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.User.current() : null, token);
  }

  render() {
    const {
      classes,
      snackType,
      snackMessage,
      snackStatus,
      onSnackClose,
      currentUser,
      appLoaded
    } = this.props;
    if (appLoaded) {
      return (
        <div className={classes.root}>
          <Switch>
            {currentUser ? (
              <Drawer>
                <Routes />
                <Snack
                  open={snackStatus}
                  variant={snackType}
                  message={snackMessage}
                  onClose={onSnackClose}
                />
              </Drawer>
            ) : (
              <Auth />
            )}
          </Switch>
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Loader />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
