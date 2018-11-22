import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MultipleSelect from "../MultipleSelect";
import TextField from "@material-ui/core/TextField";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BACKEND_URI } from "../../constants.js";
import {
    setUpdateNameField,
    setUpdateEmailField,
    openUpdateSuccessPopUp,
    closeUpdateSuccessPopUp,
    resetUpdateTenantFields
  } from "../../actions";
  import Snackbar from "@material-ui/core/Snackbar";
  import MySnackbarContentWrapper from "../MySnackbarContentWrapper";

  const mapStateToProps = state => {
    return {
      updateNameField: state.changeTenantsInputs.updateNameField,
      updateEmailField: state.changeTenantsInputs.updateEmailField,

    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      onUpdateNameChange: event =>
        dispatch(setUpdateNameField(event.target.value)),
      onUpdateEmailChange: event =>
        dispatch(setUpdateEmailField(event.target.value)),
      onUpdateSuccess: () => dispatch(openUpdateSuccessPopUp()),
      onUpdateSuccessClose: () => dispatch(closeUpdateSuccessPopUp()),
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

class FullWidthTabs extends React.Component {

  updateTenant = () => {
    fetch(`${BACKEND_URI}/tenantupdate`, { //change
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.updateNameField,
        email: this.props.updateEmailField,
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onUpdateSuccess())
      .then(() => this.props.onResetTenantUpdateFields());
  };
  render() {
    const {
      classes,
      theme,
      onUpdateNameChange,
      onUpdateEmailChange,
    } = this.props;

    return (
        <div>
            <TextField
              id="update-name"
              label="ФИО"
              margin="dense"
              onChange={onUpdateNameChange}
              value={this.props.updateNameField}
            />
            <TextField
              id="update-email"
              label="Email"
              margin="dense"
              onChange={onUpdateEmailChange}
              type="email"
              value={this.props.updateEmailField}
            />
            <Button
              color="primary"
              className={classes.button}
              onClick={this.updateTenant}
            >
              Применить
            </Button>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(FullWidthTabs));
