import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  setInsertNameField,
  setInsertEmailField,
  setInsertHouseNumberField,
  setUpdateNameField,
  setUpdateEmailField,
  setDeleteHouseNumberField,
  openInsertSuccessPopUp,
  openUpdateSuccessPopUp,
  openDeleteSuccessPopUp,
  closeInsertSuccessPopUp,
  closeUpdateSuccessPopUp,
  closeDeleteSuccessPopUp,
  setUpdateHouseNumberField,
  resetDeleteTenantFields,
  resetUpdateTenantFields,
  resetInsertTenantFields
} from "../../actions";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
const mapStateToProps = state => {
  return {
    insertNameField: state.changeTenantsInputs.insertNameField,
    insertEmailField: state.changeTenantsInputs.insertEmailField,
    insertHouseNumberField: state.changeTenantsInputs.insertHouseNumberField,
    updateNameField: state.changeTenantsInputs.updateNameField,
    updateHouseNumberField: state.changeTenantsInputs.updateHouseNumberField,
    updateEmailField: state.changeTenantsInputs.updateEmailField,
    deleteHouseNumberField: state.changeTenantsInputs.deleteHouseNumberField,
    snackInsert: state.handleSnackbars.snackInsert,
    snackUpdate: state.handleSnackbars.snackUpdate,
    snackDelete: state.handleSnackbars.snackDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInsertNameChange: event =>
      dispatch(setInsertNameField(event.target.value)),
    onInsertEmailChange: event =>
      dispatch(setInsertEmailField(event.target.value)),
    onInsertHouseNumberChange: event =>
      dispatch(setInsertHouseNumberField(event.target.value)),
    onUpdateNameChange: event =>
      dispatch(setUpdateNameField(event.target.value)),
    onUpdateEmailChange: event =>
      dispatch(setUpdateEmailField(event.target.value)),
    onUpdateHouseNumberChange: event =>
      dispatch(setUpdateHouseNumberField(event.target.value)),
    onDeleteHouseNumberChange: event =>
      dispatch(setDeleteHouseNumberField(event.target.value)),
    onInsertionSuccess: () => dispatch(openInsertSuccessPopUp()),
    onUpdateSuccess: () => dispatch(openUpdateSuccessPopUp()),
    onDeleteSuccess: () => dispatch(openDeleteSuccessPopUp()),
    onInsertionSuccessClose: () => dispatch(closeInsertSuccessPopUp()),
    onUpdateSuccessClose: () => dispatch(closeUpdateSuccessPopUp()),
    onDeleteSuccessClose: () => dispatch(closeDeleteSuccessPopUp()),
    onResetTenantInsertFields: () => dispatch(resetInsertTenantFields()),
    onResetTenantUpdateFields: () => dispatch(resetUpdateTenantFields()),
    onResetTenantDeleteFields: () => dispatch(resetDeleteTenantFields())
  };
};

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  insertTenant = () => {
    fetch("http://localhost:3001/tenantinsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.insertNameField,
        email: this.props.insertEmailField,
        houseNumber: this.props.insertHouseNumberField
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onInsertionSuccess())
      .then(() => this.props.onResetTenantInsertFields());
  };

  updateTenant = () => {
    fetch("http://localhost:3001/tenantupdate", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.updateNameField,
        email: this.props.updateEmailField,
        houseNumber: this.props.updateHouseNumberField
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onUpdateSuccess())
      .then(() => this.props.onResetTenantUpdateFields());
  };

  deleteTenant = () => {
    fetch("http://localhost:3001/tenantdelete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        houseNumber: this.props.deleteHouseNumberField
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onDeleteSuccess())
      .then(() => this.props.onResetTenantDeleteFields());
  };
  render() {
    const {
      classes,
      theme,
      onInsertNameChange,
      onInsertEmailChange,
      onInsertHouseNumberChange,
      onUpdateNameChange,
      onUpdateEmailChange,
      onDeleteHouseNumberChange,
      onUpdateHouseNumberChange
    } = this.props;

    return (
      <div className="rightbuttons">
        <AppBar position="static" color="default">
          <Tabs
            className="right-buttons"
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab className="tab" label="Добавить" />
            <Tab className="tab" label="Изменить" />
            <Tab className="tab" label="Удалить" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          className="fullwidthtabs"
        >
          <TabContainer dir={theme.direction}>
            <TextField
              id="insert-number"
              label="№Дома"
              margin="dense"
              onChange={onInsertHouseNumberChange}
              type="number"
              value={this.props.insertHouseNumberField}
            />
            <TextField
              id="insert-fio"
              label="ФИО"
              margin="dense"
              onChange={onInsertNameChange}
              value={this.props.insertNameField}
            />

            <TextField
              id="insert-email"
              label="Email"
              margin="dense"
              onChange={onInsertEmailChange}
              type="email"
              value={this.props.insertEmailField}
            />
            <Button
              color="primary"
              className={classes.button}
              onClick={this.insertTenant}
            >
              Добавить жильца
            </Button>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TextField
              id="update-housenumber"
              label="№Дома"
              margin="dense"
              onChange={onUpdateHouseNumberChange}
              value={this.props.updateHouseNumberField}
            />
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
              Изменить жильца
            </Button>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TextField
              id="delete-number"
              label="№Дома"
              type="number"
              margin="dense"
              onChange={onDeleteHouseNumberChange}
              value={this.props.deleteHouseNumberField}
            />
            <Button
              color="secondary"
              className={classes.button}
              onClick={this.deleteTenant}
            >
              Удалить жильца
            </Button>
          </TabContainer>
        </SwipeableViews>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackInsert}
          autoHideDuration={6000}
          onClose={this.props.onInsertionSuccessClose}
          ContentProps={{ "aria-describedby": "message-id" }}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onInsertionSuccessClose}
            variant="success"
            message="Пользователь успешно добавлен"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackUpdate}
          autoHideDuration={6000}
          onClose={this.props.onUpdateSuccessClose}
          ContentProps={{ "aria-describedby": "message-id" }}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onUpdateSuccessClose}
            variant="success"
            message="Пользователь успешно обновлен"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackDelete}
          autoHideDuration={6000}
          onClose={this.props.onDeleteSuccessClose}
          ContentProps={{ "aria-describedby": "message-id" }}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onDeleteSuccessClose}
            variant="success"
            message="Пользователь успешно удален"
          />
        </Snackbar>
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
