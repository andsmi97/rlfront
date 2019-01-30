import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { BACKEND_URI } from "../../constants.js";
import validator from "validator";
import { ACTION_TENANT_PENDING, ACTION_TENANT_SUCCESS } from "./constants";
import {
  setInsertTenantHouseNumberField,
  setInsertTenantNameField,
  setInsertTenantEmailField,
  requestTenants,
  openInsertTenantWindow,
  closeInsertTenantWindow,
  openEditTenantWindow,
  closeEditTenantWindow,
  setEditTenantHouseNumberField,
  setEditTenantNameField,
  setEditTenantEmailField,
  resetInsertTenantFields,
  resetUpdateTenantFields,
  selectEditTenant
} from "./actions";
import { openSnack, openAlert } from "../../actions";
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const columns = [
  {
    id: "houseNumber",
    numeric: true,
    disablePadding: false,
    label: "Номер Дома"
  },
  { id: "name", numeric: false, disablePadding: false, label: "ФИО" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "edit", numeric: false, disablePadding: false, label: "Редактирование" }
];

class TenantsHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order,
      orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columns.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

TenantsHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let TenantsToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {/* {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : ( */}
        <Typography variant="h6" id="tableTitle">
          Жильцы
        </Typography>
        {/* )} */}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {/* {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )} */}
      </div>
    </Toolbar>
  );
};

TenantsToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

TenantsToolbar = withStyles(toolbarStyles)(TenantsToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 80
  },
  table: {
    minWidth: 1020,
    paddingLeft: 20
  },
  tableWrapper: {
    overflowX: "auto"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "15px!important",
    paddingTop: "20px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    boxShadow: "none"
  }
});

const mapStateToProps = state => {
  return {
    insertTenantEmail: state.tenantsReducer.insertTenantEmail,
    insertTenantHouseNumber: state.tenantsReducer.insertTenantHouseNumber,
    insertTenantName: state.tenantsReducer.insertTenantName,
    insertWindowOpened: state.tenantsReducer.insertWindowOpened,
    editWindowOpened: state.tenantsReducer.editWindowOpened,
    editTenantName: state.tenantsReducer.editTenantName,
    editTenantEmail: state.tenantsReducer.editTenantEmail,
    editTenantHouseNumber: state.tenantsReducer.editTenantHouseNumber,
    editTenantID: state.tenantsReducer.editTenantID,
    tenants: state.tenantsReducer.tenants,
    error: state.tenantsReducer.error,
    isPending: state.tenantsReducer.isPending,
    snackInsert: state.tenantsReducer.snackInsert,
    snackUpdate: state.tenantsReducer.snackUpdate,
    snackDelete: state.tenantsReducer.snackDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestPosts: () => dispatch(requestTenants()),
    onInsertTenantHouseNumberChange: event =>
      dispatch(setInsertTenantHouseNumberField(event.target.value)),
    onInsertTenantNameChange: event =>
      dispatch(setInsertTenantNameField(event.target.value)),
    onInsertTenantEmailChange: event =>
      dispatch(setInsertTenantEmailField(event.target.value)),

    onEditTenantHouseNumberChange: event =>
      dispatch(setEditTenantHouseNumberField(event.target.value)),
    onEditTenantNameChange: event =>
      dispatch(setEditTenantNameField(event.target.value)),
    onEditTenantEmailChange: event =>
      dispatch(setEditTenantEmailField(event.target.value)),

    onOpenInsertTenantWindow: () => dispatch(openInsertTenantWindow()),
    onCloseInsertTenantWindow: () => dispatch(closeInsertTenantWindow()),

    onOpenEditTenantWindow: () => dispatch(openEditTenantWindow()),
    onCloseEditTenantWindow: () => dispatch(closeEditTenantWindow()),

    openSnack: (type, message) => dispatch(openSnack(type, message)),
    openAlert: (message, alertFunction) =>
      dispatch(openAlert(message, alertFunction)),

    onResetInsertTenantFields: () => dispatch(resetInsertTenantFields()),
    onResetUpdateTenantFields: () => dispatch(resetUpdateTenantFields()),

    onUpdateTenantClick: id => dispatch(selectEditTenant(id)),

    actionTenantPending: () =>
      dispatch({
        type: ACTION_TENANT_PENDING
      }),
    actionTenantSuccess: data =>
      dispatch({
        type: ACTION_TENANT_SUCCESS,
        payload: data
      })
  };
};

class Tenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "houseNumber",
      selected: [],
      data: this.props.tenants,
      page: 0,
      rowsPerPage: 10,
      open: false,
      emailError: ""
    };
  }

  handleClickOpen = houseNumber => {
    this.props.openAlert("Вы действительно хотите удалить жильца?", () => {
      const token = window.localStorage.getItem("token");
      this.props.actionTenantPending();
      fetch(`${BACKEND_URI}/tenantdelete`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ houseNumber })
      })
        .then(response => response.json())
        .then(data => this.props.actionTenantSuccess(data))
        .then(data => this.setState({ data: data.payload }))
        .then(() => this.props.openSnack("success", "Жилец удален"));
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  insertTenant = () => {
    const token = window.localStorage.getItem("token");
    const {
      actionTenantPending,
      insertTenantName,
      insertTenantEmail,
      insertTenantHouseNumber,
      actionTenantSuccess,
      openSnack,
      onResetInsertTenantFields
    } = this.props;
    actionTenantPending();

    fetch(`${BACKEND_URI}/tenantinsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        name: insertTenantName,
        email: insertTenantEmail,
        houseNumber: insertTenantHouseNumber
      })
    })
      .then(response => response.json())
      .then(data => actionTenantSuccess(data))
      .then(data => this.setState({ data: data.payload }))
      .then(() => openSnack("success", "Жилец добавлен"))
      .then(() => onResetInsertTenantFields())
      // .catch(error => this.props.loadTenantsError(error));
      .catch(error => console.log(error));
  };

  updateTenant = () => {
    if (!validator.isEmail(this.props.editTenantEmail)) {
      return this.setState({ emailError: "Введите правильный email" });
    }

    const token = window.localStorage.getItem("token");
    const {
      actionTenantPending,
      editTenantName,
      editTenantEmail,
      editTenantHouseNumber,
      actionTenantSuccess,
      openSnack,
      onResetUpdateTenantFields
    } = this.props;
    actionTenantPending();
    fetch(`${BACKEND_URI}/tenantupdate`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        name: editTenantName,
        email: editTenantEmail,
        houseNumber: editTenantHouseNumber
      })
    })
      .then(response => response.json())
      .then(data => actionTenantSuccess(data))
      .then(data => this.setState({ data: data.payload }))
      .then(() => openSnack("success", "Жилец обновлен"))
      .then(() => onResetUpdateTenantFields());
    // .catch(error => this.props.loadTenantsError(error));
  };

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const {
      classes,
      insertWindowOpened,
      editWindowOpened,
      insertTenantEmail,
      insertTenantHouseNumber,
      insertTenantName,
      editTenantName,
      editTenantHouseNumber,
      editTenantEmail,
      onInsertTenantHouseNumberChange,
      onInsertTenantNameChange,
      onInsertTenantEmailChange,
      onEditTenantHouseNumberChange,
      onEditTenantNameChange,
      onEditTenantEmailChange,
      onCloseInsertTenantWindow,
      onCloseEditTenantWindow
    } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div style={{ width: "100%" }}>
        {insertWindowOpened && (
          <div style={{ width: "100%", marginTop: 80 }}>
            <Paper className={classes.paper}>
              <TextField
                id="insert-tenant-housenumber"
                label="Номер дома"
                value={insertTenantHouseNumber}
                margin="dense"
                variant="filled"
                onChange={onInsertTenantHouseNumberChange}
                required
                type="number"
              />
              <TextField
                id="insert-tenant-name"
                label="ФИО"
                value={insertTenantName}
                margin="dense"
                variant="filled"
                onChange={onInsertTenantNameChange}
                required
                type="text"
              />
              {this.state.emailError ? (
                <TextField
                  error
                  id="insert-tenant-error"
                  label={this.state.emailError}
                  margin="dense"
                  type="email"
                  defaultValue={insertTenantEmail}
                  onChange={event => {
                    this.setState({ emailError: "" });
                    onInsertTenantEmailChange(event);
                  }}
                  className={classes.textField}
                />
              ) : (
                <TextField
                  id="edit-tenant-email"
                  label="Email"
                  value={insertTenantEmail}
                  margin="dense"
                  variant="filled"
                  type="email"
                  onChange={event => {
                    this.setState({ emailError: "" });
                    onInsertTenantEmailChange(event);
                  }}
                />
              )}
              <Button
                color="primary"
                className={classes.button}
                onClick={this.insertTenant}
              >
                Добавить жильца
              </Button>
            </Paper>
          </div>
        )}
        {editWindowOpened && (
          <div style={{ width: "100%", marginTop: 80 }}>
            <Paper className={classes.paper}>
              <TextField
                disabled
                id="edit-tenant-housenumber"
                label="Номер дома"
                value={editTenantHouseNumber}
                margin="dense"
                variant="filled"
                onChange={onEditTenantHouseNumberChange}
              />
              <TextField
                id="edit-tenant-name"
                label="ФИО"
                value={editTenantName}
                margin="dense"
                variant="filled"
                onChange={onEditTenantNameChange}
              />
              {this.state.emailError ? (
                <TextField
                  error
                  id="standard-error"
                  label={this.state.emailError}
                  margin="dense"
                  type="email"
                  defaultValue={editTenantEmail}
                  onChange={event => {
                    this.setState({ emailError: "" });
                    onEditTenantEmailChange(event);
                  }}
                  className={classes.textField}
                />
              ) : (
                <TextField
                  id="edit-tenant-email"
                  label="Email"
                  value={editTenantEmail}
                  margin="dense"
                  variant="filled"
                  type="email"
                  onChange={event => {
                    this.setState({ emailError: "" });
                    onEditTenantEmailChange(event);
                  }}
                />
              )}

              <Button
                color="primary"
                className={classes.button}
                onClick={this.updateTenant}
              >
                Обновить жильца
              </Button>
            </Paper>
          </div>
        )}
        <Paper className={classes.root}>
          <TenantsToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TenantsHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={n._id}
                        selected={isSelected}
                      >
                        <TableCell component="th" scope="row" padding="default">
                          {n.houseNumber}
                        </TableCell>
                        <TableCell align="right">{n.name}</TableCell>
                        <TableCell align="right">{n.email}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="Edit"
                            component="span"
                            color="primary"
                            onClick={() =>
                              this.props.onUpdateTenantClick(n._id)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            color="secondary"
                            onClick={() => this.handleClickOpen(n.houseNumber)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Количество записей на странице"
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        {insertWindowOpened &&
          !editWindowOpened && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={onCloseInsertTenantWindow}
            >
              <CloseIcon />
            </Button>
          )}
        {!insertWindowOpened &&
          editWindowOpened && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={onCloseEditTenantWindow}
            >
              <CloseIcon />
            </Button>
          )}
        {!insertWindowOpened &&
          !editWindowOpened && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={() => {
                this.props.onOpenInsertTenantWindow();
              }}
            >
              <AddIcon />
            </Button>
          )}
        {/* <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackInsert}
          autoHideDuration={6000}
          onClose={this.props.onInsertionSuccessClose}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onInsertionSuccessClose}
            variant="success"
            message="Жилец добавлен"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackUpdate}
          autoHideDuration={6000}
          onClose={this.props.onUpdateSuccessClose}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onUpdateSuccessClose}
            variant="success"
            message="Информация о жильце обновлена"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackDelete}
          autoHideDuration={6000}
          onClose={this.props.onDeleteSuccessClose}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onDeleteSuccessClose}
            variant="success"
            message="Жилец удален"
          />
        </Snackbar> */}
      </div>
    );
  }
}

Tenants.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Tenants));
