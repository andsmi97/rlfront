import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import SensorRows from "./SensorRows";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import {
  SENSORSDATA_LOADED,
  SENSORSDATA_UNLOADED,
  TARIFFS_LOADED,
  CHANGE_SENSOR_STATE,
  LAST_BILLS_LOADED,
  SENSORS_CLEAR,
  LAST_BILL_DATE_LOADED,
  SET_SENSORS_ERRORS,
  SET_PREVIOUS_DATA
} from "../../constants/actionTypes";
import { openSnack } from "../../actions";
import agent from "../../agent.js";
import InitialValuesDialogButton from "./initialValuesDialog";

const mapStateToProps = state => ({
  ...state.sensordata,
  isInitialValuesSet:
    state.common.currentUser && state.common.currentUser.isInitialValuesSet
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: SENSORSDATA_LOADED, payload }),
  onTariffsLoad: payload => dispatch({ type: TARIFFS_LOADED, payload }),
  onLastBillsLoad: payload => dispatch({ type: LAST_BILLS_LOADED, payload }),
  onUnload: () => dispatch({ type: SENSORSDATA_UNLOADED }),
  openSnack: (type, message) => dispatch(openSnack(type, message)),
  onTariffChange: (key, value) =>
    dispatch({ type: CHANGE_SENSOR_STATE, key, value }),
  onClear: () => dispatch({ type: SENSORS_CLEAR }),
  onError: payload => dispatch({ type: SET_SENSORS_ERRORS, payload }),
  setPreviousData: (lastBillDate, houses) =>
    dispatch({ type: SET_PREVIOUS_DATA, lastBillDate, houses }),
  onLoadLastBillDate: payload =>
    dispatch({ type: LAST_BILL_DATE_LOADED, payload })
});

const styles = theme => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    marginBottom: 32
  },
  paperWarrning: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    marginBottom: 32
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 24,
    width: "100%"
  },
  titleWithButton: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class Bills extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        0
      ),
      errors: []
    };
  }

  componentDidMount() {
    this.props.onLoad(agent.Tenants.getAllHousesWithLastSensorValues());
    this.props.onTariffsLoad(agent.Tariffs.getLast());
    this.props.onLoadLastBillDate(agent.Bill.getLastBillDate());
  }
  componentWillUnmount() {
    this.props.onUnload();
  }

  handleDateChange = selectedDate => this.setState({ selectedDate });

  handleChange = name => event =>
    this.props.onTariffChange(name, event.target.value);

  onSubmit = async e => {
    e.preventDefault();
    const { houses } = this.props;

    const payload = await agent.Sensors.insertAll({
      billDate: this.state.selectedDate,
      dayTariff: this.props.dayTariff,
      nightTariff: this.props.nightTariff,
      houses: houses.map(house => {
        return {
          houseNumber: house.houseNumber,
          day: this.props[`day${house.houseNumber}`],
          night: this.props[`night${house.houseNumber}`]
        };
      })
    });
    //payload can be only error here
    if (payload) {
      this.props.openSnack("error", payload.error.msg);
      if (payload.error.errors) {
        console.log("i wanted to dispatch");
        this.props.onError(payload.error.errors);
      }
    } else {
      this.props.openSnack(
        "success",
        `Счета за ${format(
          this.state.selectedDate,
          "dd/MM/yyyy"
        )} cозданы. Для рассылки, перейдите во вкладку рассылка`
      );
      this.props.onError([]);
      this.props.setPreviousData(
        this.state.selectedDate,
        houses.map(house => {
          return {
            houseNumber: house.houseNumber,
            lastDayValue: this.props[`day${house.houseNumber}`],
            lastNightValue: this.props[`night${house.houseNumber}`]
          };
        })
      );
      this.props.onClear();
    }
  };

  onSubmitTariffs = async e => {
    e.preventDefault();
    await agent.Tariffs.insert(this.props.dayTariff, this.props.nightTariff);
    this.props.openSnack("success", "Тарифы сохранены");
  };

  onRemoveLastBills = async () => {
    try {
      const newData = await agent.Bills.removeLastBills();
      this.props.setPreviousData(
        newData.lastBillDate,
        newData.houses.map(house => {
          return {
            houseNumber: house.houseNumber,
            lastDayValue: this.props[`day${house.houseNumber}`],
            lastNightValue: this.props[`night${house.houseNumber}`]
          };
        })
      );
      this.props.openSnack("success", "Последние счета удалены");
    } catch (e) {
      this.props.openSnack("error", "Возникла ошибка, попробуйте позже");
    }
  };
  render() {
    const { houses, classes, errors } = this.props;
    const housesWithErrors = errors
      ? houses.map(house => {
          const houseError = errors.find(
            error => error.houseNumber === house.houseNumber
          );
          if (houseError) {
            return { ...house, ...houseError };
          }
          return house;
        })
      : houses;
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          {this.props.lastBillDate && (
            <Paper elevaltion={2} className={classes.paper}>
              <Typography variant="body1">
                Последний счет за:{" "}
                {format(this.props.lastBillDate, "dd/MM/yyyy")}
              </Typography>
            </Paper>
          )}
          <Typography variant="h5" gutterBottom>
            Тарифы
          </Typography>
          <Paper elevaltion={2}>
            <form onSubmit={this.onSubmitTariffs} className={classes.paper}>
              <TextField
                id="day"
                label="День"
                className={classes.textField}
                value={this.props.dayTariff}
                onChange={this.handleChange("dayTariff")}
                margin="normal"
                variant="filled"
                type="number"
              />
              <TextField
                id="night"
                label="Ночь"
                className={classes.textField}
                value={this.props.nightTariff}
                onChange={this.handleChange("nightTariff")}
                margin="normal"
                variant="filled"
                type="number"
              />
              <Button type="submit" color="primary">
                Сохранить Тарифы
              </Button>
            </form>
          </Paper>
          <div className={classes.titleWithButton}>
            <Typography variant="h5" gutterBottom>
              Показания счетчиков
            </Typography>
            <InitialValuesDialogButton />
          </div>
          <Paper className={classes.paper} elevation={2}>
            {this.props.isInitialValuesSet ? (
              <form onSubmit={this.onSubmit}>
                {housesWithErrors.map(item => (
                  <SensorRows
                    key={item.houseNumber}
                    index={item.houseNumber}
                    houseNumber={item.houseNumber}
                    dayPlaceholder={item.lastDayValue}
                    nightPlaceholder={item.lastNightValue}
                    dayError={item.day}
                    nightError={item.night}
                  />
                ))}
                <div className={classes.actionBar}>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={ruLocale}
                  >
                    <KeyboardDatePicker
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                      cancelLabel="ОТМЕНА"
                      okLabel="ОК"
                      format="dd/MM/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                  <Button
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Применить
                  </Button>
                </div>
              </form>
            ) : (
              <Typography variant="body1">
                Чтобы внести показания и создать счета, внесите первичные
                показания
              </Typography>
            )}
          </Paper>
          {this.props.lastBillDate && (
            <Paper elevaltion={2} className={classes.paperWarrning}>
              <Typography variant="body1">
                Удалить последние счета за:{" "}
                {format(this.props.lastBillDate, "dd/MM/yyyy")}
              </Typography>
              <Button onClick={this.onRemoveLastBills} color="secondary">
                Удалить
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Bills));
