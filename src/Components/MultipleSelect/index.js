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
import { changeTenants, requestTenants, selectAllTenants } from "../../actions";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    selectedTenants: state.requestTenants.selectedTenants,
    tenants: state.requestTenants.tenants,
    tenantsArray: state.requestTenants.tenantsArray,
    isPending: state.requestTenants.isPending,
    error: state.requestTenants.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTenantChange: event => dispatch(changeTenants(event.target.value)),
    onRequestTenants: () => dispatch(requestTenants()),
    onSelectAllTenants: tenants => dispatch(selectAllTenants(tenants))
  };
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

class MultipleSelect extends React.Component {
  componentDidMount() {
    this.props.onRequestTenants();
  }

  render() {
    const {
      classes,
      onTenantChange,
      selectedTenants,
      tenantsArray
    } = this.props;
    return <Paper className="w40 h100 rightpart">
        <div className={classes.root}>
          <FormControl className="nameselect">
            <InputLabel htmlFor="select-multiple-chip">
              Получатели
            </InputLabel>
            <Select multiple value={selectedTenants} onChange={onTenantChange} input={<Input id="select-multiple-chip" />} renderValue={selected => <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip
                      key={value}
                      label={value}
                      className={classes.chip}
                    />
                  ))}
                </div>} MenuProps={MenuProps}>
              {tenantsArray.map(selectedTenant => (
                <MenuItem key={selectedTenant} value={selectedTenant}>
                  {selectedTenant}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FullWidthTabs />
        </div>
      </Paper>;
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
