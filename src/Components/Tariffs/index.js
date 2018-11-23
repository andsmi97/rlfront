import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BACKEND_URI } from "../../constants.js";
import {
  setUpdateTariffs,
  openUpdateTariffsSuccessPopUp,
  closeUpdateTariffsSuccessPopUp,
  resetTariffsField,
  openTariffsSuccessPopUp,
  closeTariffsSuccessPopUp
} from "../../actions";

const mapStateToProps = state => {
  return {
    updateTariffsField: state.changeTariffsInputs.updateTariffsField,
    snackTariffs: state.handleSnackbars.snackTariffs
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdateTariffs: event => dispatch(setUpdateTariffs(event.target.value)),

    onResetTariffs: () => dispatch(resetTariffsField()),

    onUpdateTariffsSuccess: () => dispatch(openUpdateTariffsSuccessPopUp()),
    onUpdateTariffsSuccessClose: () =>
      dispatch(closeUpdateTariffsSuccessPopUp()),

    onTariffsSuccess: () => dispatch(openTariffsSuccessPopUp()),
    onTariffsSuccessClose: () => dispatch(closeTariffsSuccessPopUp())
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

class Tariffs extends React.Component {
  updateTariffs = () => {
    fetch(`${BACKEND_URI}/changetariffs`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gas: "100"
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onTariffsSuccess())
      .then(() => this.props.onUpdateTariffsSuccess())
      .then(() => this.props.onResetTariffs());
  };
  render() {
    const { classes, theme, onUpdateTariffs } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Paper class="TariffsSettings">
              <Typography variant="h4" gutterBottom>
                Тарифы
              </Typography>
              <TextField
                id="new-tariff"
                label="Новый тариф"
                margin="dense"
                onChange={onUpdateTariffs}
                value={this.props.updateTariffsField}
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackTariffs}
          autoHideDuration={6000}
          onClose={this.props.onTariffsSuccessClose}
          ContentProps={{ "aria-describedby": "message-id" }}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onTariffsSuccessClose}
            variant="success"
            message="Тарифы изменены"
          />
        </Snackbar>
      </main>
    );
  }
}

Tariffs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Tariffs));
