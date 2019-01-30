import React, { Component } from "react";
import Drawer from "./Components/ClippedDrawer";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Auth from "./Components/Auth";
import Snack from "./Components/Snack";
import DeleteAlert from "./Components/DeleteAlert";
import "./App.css";
import { authenticate, closeSnack, closeAlert, acceptAlert } from "./actions";

const styles = theme => ({
  root: {
    height: "100vh"
  }
});

const mapStateToProps = state => {
  return {
    isResponseCorrect: state.authReducer.isResponseCorrect,
    snackType: state.appReducer.snackType,
    snackMessage: state.appReducer.snackMessage,
    snackStatus: state.appReducer.snackStatus,
    alertMessage: state.appReducer.alertMessage,
    alertStatus: state.appReducer.alertStatus,
    alertFunction: state.appReducer.alertFunction
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSnackClose: () => dispatch(closeSnack()),
    onAlertClose: () => dispatch(closeAlert()),
    onAlertAccept: () => dispatch(acceptAlert()),
    onAuth: () => dispatch(authenticate())
  };
};
class App extends Component {
  componentDidMount() {
    this.props.onAuth();
  }
  render() {
    const {
      classes,
      snackType,
      snackMessage,
      snackStatus,
      onSnackClose,
      isResponseCorrect,
      alertStatus,
      alertMessage,
      onAlertClose,
      onAlertAccept,
      alertFunction
    } = this.props;
    return (
      <div className={classes.root}>
        {isResponseCorrect ? <Drawer /> : <Auth />}
        <Snack
          open={snackStatus}
          variant={snackType}
          message={snackMessage}
          onClose={onSnackClose}
        />
        <DeleteAlert
          open={alertStatus}
          message={alertMessage}
          handleClose={onAlertClose}
          handleAccept={() => {
            alertFunction();
            onAlertAccept();
          }}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
