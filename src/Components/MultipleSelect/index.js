import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import FullWidthTabs from "../FullWidthTabs";
import Paper from "@material-ui/core/Paper";
import { changeTenants } from "../../actions";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { selectedTenants: state.changeSelectedTenants.selectedTenants };
  // searchField: state.searchRobots.searchField,
  // robots: state.requestRobots.robots,
  // isPending: state.requestRobots.isPending,
  // error: state.requestRobots.error
};
const mapDispatchToProps = dispatch => {
  return {
    onTenantChange: event => dispatch(changeTenants(event.target.value))
  };
  // onSearchChange: event => dispatch(setSearchField(event.target.value)),
  // onRequestRobots: () => dispatch(requestRobots())
};
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  "Гуляев Вячеслав Владленович",
  "Попов Артем Гордеевич",
  "Силин Донат Глебович",
  "Третьяков Пантелеймон Онисимович",
  "Агафонов Глеб Михайлович",
  "Кузьмин Владлен Вениаминович",
  "Ефремов Юрий Геннадьевич",
  "Кузнецов Остап Иосифович",
  "Красильников Карл Рудольфович",
  "Рябов Семен Русланович"
];
class MultipleSelect extends React.Component {
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes, theme, onTenantChange, selectedTenants } = this.props;
    return (
      <Paper className="w40 h100">
        <div className={classes.root}>
          <FormControl className="nameselect">
            <InputLabel htmlFor="select-multiple-chip">Получатели</InputLabel>
            <Select
              multiple
              value={selectedTenants}
              onChange={onTenantChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map(name => (
                <MenuItem
                  key={name}
                  value={name}
                  style={{
                    fontWeight:
                      selectedTenants.indexOf(name) === -1
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FullWidthTabs />
        </div>
      </Paper>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MultipleSelect));
