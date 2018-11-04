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
  setDeleteHouseNumberField
} from "../../actions";

const mapStateToProps = state => {
  return {
    insertNameField: state.changeTenantsInputs.insertNameField,
    insertEmailField: state.changeTenantsInputs.insertEmailField,
    insertHouseNumberField: state.changeTenantsInputs.insertHouseNumberField,
    updateNameField: state.changeTenantsInputs.insertNameField,
    updateEmailField: state.changeTenantsInputs.insertEmailField,
    deleteHouseNumberField: state.changeTenantsInputs.deleteHouseNumberField
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
    onDeleteHouseNumberChange: event =>
      dispatch(setDeleteHouseNumberField(event.target.value))
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
    }).then(response => console.log(response));
  };

  updateTenant = () => {
    fetch("http://localhost:3001/tenantupdate", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.updateNameField,
        email: this.props.updateEmailField,
        houseNumber: this.props.insertHouseNumberField
      })
    }).then(response => console.log(response));
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
    }).then(response => console.log(response));
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
      onDeleteHouseNumberChange
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
            <Tab label="Добавить" />
            <Tab label="Изменить" />
            <Tab label="Удалить" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <TextField
              id="standard-dense"
              label="ФИО"
              margin="dense"
              onChange={onInsertNameChange}
            />
            <TextField
              id="standard-dense"
              label="№Дома"
              margin="dense"
              onChange={onInsertHouseNumberChange}
            />
            <TextField
              id="standard-dense"
              label="Email"
              margin="dense"
              onChange={onInsertEmailChange}
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
              id="standard-dense"
              label="ФИО"
              margin="dense"
              onChange={onUpdateNameChange}
            />
            <TextField
              id="standard-dense"
              label="Email"
              margin="dense"
              onChange={onUpdateEmailChange}
            />
            <Button color="primary" className={classes.button}>
              Изменить жильца
            </Button>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TextField
              id="standard-dense"
              label="№Дома"
              margin="dense"
              onChange={onDeleteHouseNumberChange}
            />
            <Button color="secondary" className={classes.button} onClick={this.deleteTenant}>
              Удалить жильца
            </Button>
          </TabContainer>
        </SwipeableViews>
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
