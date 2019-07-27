import React from "react";
import HomeIcon from "@material-ui/icons/Home";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { CHANGE_SENSOR_STATE } from "../../constants/actionTypes";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginLeft: 16
  },
  menu: {
    width: 200
  }
});

const mapStateToProps = state => ({ ...state.sensordata });

const mapDispatchToProps = dispatch => ({
  onSensorDataChange: (key, value) =>
    dispatch({ type: CHANGE_SENSOR_STATE, key, value })
});

class SensorRows extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { houseNumber } = this.props;
    if (nextProps.errors !== this.props.errors) {
      return true;
    }
    return (
      nextProps[`day${houseNumber}`] !== this.props[`day${houseNumber}`] ||
      nextProps[`night${houseNumber}`] !== this.props[`night${houseNumber}`]
    );
  }
  handleChange = name => event =>
    this.props.onSensorDataChange(name, event.target.value);

  render() {
    const { houseNumber, dayError, nightError, classes } = this.props;

    return (
      <>
        <ListItem alignItems="center">
          <HomeIcon />
          <ListItemText
            primary={`Участок №${houseNumber}`}
            className={classes.dense}
          />
          <TextField
            error={dayError}
            id="day"
            label="День"
            className={classes.textField}
            value={
              this.props[`day${houseNumber}`]
                ? this.props[`day${houseNumber}`]
                : ""
            }
            onChange={this.handleChange(`day${houseNumber}`)}
            margin="normal"
            variant="filled"
            type="number"
            placeholder={String(this.props.dayPlaceholder)}
          />
          <TextField
            error={nightError}
            id="night"
            label="Ночь"
            className={classes.textField}
            value={
              this.props[`night${houseNumber}`]
                ? this.props[`night${houseNumber}`]
                : ""
            }
            onChange={this.handleChange(`night${houseNumber}`)}
            margin="normal"
            variant="filled"
            type="number"
            placeholder={String(this.props.nightPlaceholder)}
          />
        </ListItem>
        <Divider variant="inset" />
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SensorRows));
