import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SensorRows from "./SensorRows";
import agent from "../../agent";
import { connect } from "react-redux";
import { openSnack } from "../../actions";
import { SENSORS_CLEAR, SET_INITIAL_VALUES } from "../../constants/actionTypes";

const mapStateToProps = state => ({ ...state.sensordata });
const mapDispatchToProps = dispatch => ({
  openSnack: (type, message) => dispatch(openSnack(type, message)),
  onSetInitialValues: payload =>
    dispatch({ type: SET_INITIAL_VALUES, payload }),
  onClear: () => dispatch({ type: SENSORS_CLEAR })
});

const InitialValuesDialog = props => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async e => {
    e.preventDefault();
    props.onSetInitialValues(
      await agent.Sensors.setInitialValues({
        tenants: props.houses.map(house => {
          return {
            houseNumber: house.houseNumber,
            lastDayValue: props[`day${house.houseNumber}`],
            lastNightValue: props[`night${house.houseNumber}`]
          };
        })
      })
    );
    props.onClear();
    props.openSnack("success", "Первичные показания внесены");
    setOpen(false);
  };
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Первичные показания
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title">
            {"Первичные показания"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Первичные показания необходимы для вычисления разницы между
              текущими и прошлыми показаниями счетчиков. Первичные показания
              вносятся 1 раз для каждого дома.
            </DialogContentText>
            {props.houses.map(item => (
              <SensorRows
                key={item.houseNumber}
                index={item.houseNumber}
                houseNumber={item.houseNumber}
                dayPlaceholder={item.lastDayValue}
                nightPlaceholder={item.lastNightValue}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              Внести
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialValuesDialog);
