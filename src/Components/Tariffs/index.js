import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BACKEND_URI } from "../../constants.js";
import { openSnack } from "../../actions";
import { setUpdateTariffs, resetTariffsField, requestTariffs } from "./actions";

const mapStateToProps = state => {
  return {
    tariffField: state.tariffsReducer.tariffField,
    snackTariffs: state.tariffsReducer.snackTariffs
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdateTariffs: event => dispatch(setUpdateTariffs(event.target.value)),
    onResetTariffs: () => dispatch(resetTariffsField()),
    onRequestTariffs: () => dispatch(requestTariffs()),
    openSnack: (type, message) => dispatch(openSnack(type, message))
  };
};

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    minWidth: 0,
    marginTop: 50,
    overflowY: "scroll" // So the Typography noWrap works
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: "2%",
    padding: "15px!important",
    paddingTop: "20px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    boxShadow: "none",
    marginBottom: 15,
    marginLeft: 15
  }
});

class Tariffs extends React.Component {
  updateTariffs = () => {
    const token = window.localStorage.getItem("token");
    fetch(`${BACKEND_URI}/changetariffs`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        gas: this.props.tariffField
      })
    }).then(() => this.props.openSnack("success", "Тарифы обновлены"));
  };
  componentDidMount() {
    this.props.onRequestTariffs();
  }
  render() {
    const { classes, onUpdateTariffs, tariffField } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction="column" justify="flex-start">
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom>
                Тарифы
              </Typography>
              <TextField
                id="new-tariff"
                label="Новый тариф"
                margin="dense"
                onChange={onUpdateTariffs}
                value={tariffField}
                type="number"
              />
              <Button
                color="primary"
                className={classes.button}
                onClick={this.updateTariffs}
              >
                Применить
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </main>
    );
  }
}

Tariffs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Tariffs));
