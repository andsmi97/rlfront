import React, { useState } from "react";
import {
  SortingState,
  EditingState,
  PagingState,
  IntegratedPaging,
  IntegratedSorting,
  SelectionState,
  IntegratedSelection,
  SearchState,
  IntegratedFiltering,
  RowDetailState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableSelection,
  Toolbar,
  SearchPanel,
  TableRowDetail
} from "@devexpress/dx-react-grid-material-ui";
import { format } from "date-fns";
import Paper from "@material-ui/core/Paper";
import {
  tableMessages,
  pagingPanelMessages,
  sortingMessages,
  searchMessages
} from "./localization";
import Command from "./CommandButtons";
import agent from "../../agent";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  CHANGE_TABLE_STATE,
  TENANTS_PAGE_LOADED,
  TENANTS_PAGE_UNLOADED
} from "../../constants/actionTypes";
import { commitChanges, commitBillChanges } from "./actions";
import Loading from "../Loader";
import IconButton from "@material-ui/core/IconButton";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import SendBillDialog from "../SendBillDialog";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";

const convertDate = dateString => {
  return new Date(
    ...dateString
      .split("/")
      .slice()
      .reverse()
      .map((item, index) => (index === 1 ? Number(item) - 1 : item))
  );
};

const detailColumns = [
  { name: "billDate", title: "Дата счета" },
  { name: "createdAt", title: "Дата создания документа" },
  { name: "dayCounter", title: "День" },
  { name: "nightCounter", title: "Ночь" },
  { name: "dayTariff", title: "Тариф День" },
  { name: "nightTariff", title: "Тариф Ночь" },
  { name: "file", title: "Файл" },
  { name: "sender", title: "Повторная отправка" }
];

const tableDetailColumnExtensions = [
  { columnName: "billDate", width: 200 },
  { columnName: "createdAt", width: 200 },
  { columnName: "dayCounter", width: 150 },
  { columnName: "nightCounter", width: 150 },
  { columnName: "dayTariff", width: 150 },
  { columnName: "nightTariff", width: 150 },
  { columnName: "file", width: 80 },
  { columnName: "sender", width: 165 }
];

const styles = theme => ({
  root: {
    position: "relative"
  },
  detailContainer: {
    margin: "20px"
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize
  },
  clicableItem: {
    color: theme.palette.primary.main
  }
});

const ActionCell = withStyles(styles)(
  ({ row, column, classes, ...restProps }) => {
    if (column.name === "sender") {
      return (
        <Table.Cell>
          <SendBillDialog
            file={row.file}
            subject={"Тема"}
            message={"Сообщение"}
            houseNumber={1}
          />
        </Table.Cell>
      );
    } else if (column.name === "file") {
      return (
        <Table.Cell>
          <IconButton
            href={`http://localhost:8082/api/download/bill/${row.file}`}
            className={classes.clicableItem}
          >
            <FileIcon />
          </IconButton>
        </Table.Cell>
      );
    } else {
      return <Table.Cell row={row} column={column} {...restProps} />;
    }
  }
);

const LookupEditCellBase = ({
  availableColumnValues,
  value,
  type,
  onValueChange,
  classes
}) => (
  <TableCell className={classes.lookupEditCell}>
    {type === "number" && (
      <TextField
        type="number"
        inputProps={{ min: "0" }}
        value={value ? value : ""}
        onChange={e => {
          onValueChange(e.target.value);
        }}
      />
    )}
    {type === "date" && (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <KeyboardDatePicker
          value={
            //converting '30/12/2019' string to Date format
            typeof value === "string"
              ? convertDate(value)
              : value
              ? value
              : new Date()
          }
          onChange={e => {
            onValueChange(e);
          }}
          cancelLabel="ОТМЕНА"
          okLabel="ОК"
          format="dd/MM/yyyy"
        />
      </MuiPickersUtilsProvider>
    )}
  </TableCell>
);
export const LookupEditCell = withStyles(styles, {
  name: "ControlledModeDemo"
})(LookupEditCellBase);

const EditCell = props => {
  const { name } = props.column;
  if (
    name === "dayTariff" ||
    name === "nightTariff" ||
    name === "dayCounter" ||
    name === "nightCounter"
  ) {
    return <LookupEditCell type="number" {...props} />;
  }
  if (name === "billDate") {
    return <LookupEditCell type="date" {...props} />;
  }
  return <TableEditRow.Cell {...props} />;
};
const mapStateToProps = state => ({ ...state.tenants });
const mapBillDispatchToProps = dispatch => ({
  onCommitChanges: tenantId => e => dispatch(commitBillChanges(e, tenantId))
});
const GridDetailContainerBase = connect(
  mapStateToProps,
  mapBillDispatchToProps
)(
  withStyles(styles)(({ row, classes, parentId, onCommitChanges }) => {
    const [data] = useState(
      row.documents.map(document => {
        return {
          ...document,
          billDate: format(new Date(document.billDate), "dd/MM/yyyy"),
          createdAt: format(new Date(document.createdAt), "dd/MM/yyyy")
        };
      })
    );
    console.log("parentId", parentId);
    const [sorting, setSorting] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageSizes] = useState([5, 10, 0]);
    const [editingRowIds, setEditingRowIds] = useState([]);
    const [rowChanges, setRowChanges] = useState({});
    const [addedRows, setAddedRows] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const editingStateColumnExtensions = [
      { columnName: "createdAt", editingEnabled: false },
      { columnName: "file", editingEnabled: false },
      { columnName: "sender", editingEnabled: false }
    ];

    return (
      <div className={classes.detailContainer}>
        <Paper>
          <Grid
            rows={data}
            columns={detailColumns}
            className={classes.root}
            getRowId={row => row._id}
          >
            <SortingState sorting={sorting} onSortingChange={setSorting} />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
            <SearchState value={searchValue} onValueChange={setSearchValue} />
            <EditingState
              editingRowIds={editingRowIds}
              onEditingRowIdsChange={setEditingRowIds}
              rowChanges={rowChanges}
              onRowChangesChange={setRowChanges}
              addedRows={addedRows}
              onAddedRowsChange={setAddedRows}
              onCommitChanges={onCommitChanges(parentId)}
              className={classes.clicableItem}
              columnExtensions={editingStateColumnExtensions}
            />
            <IntegratedFiltering />
            <IntegratedSorting />
            <IntegratedPaging />
            <Table
              columnExtensions={tableDetailColumnExtensions}
              cellComponent={ActionCell}
            />

            <Toolbar />
            <SearchPanel messages={searchMessages} />
            <TableEditRow cellComponent={EditCell} />

            <TableEditColumn
              width={110}
              showAddCommand={!addedRows.length}
              showEditCommand
              showDeleteCommand
              commandComponent={Command}
              className={classes.clicableItem}
            />

            <TableHeaderRow showSortingControls messages={sortingMessages} />
            <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
          </Grid>
        </Paper>
      </div>
    );
  })
);

const mapDispatchToProps = dispatch => ({
  onTableChange: (key, value) =>
    dispatch({ type: CHANGE_TABLE_STATE, key, value }),
  onLoad: payload => dispatch({ type: TENANTS_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: TENANTS_PAGE_UNLOADED }),
  onCommitChanges: e => dispatch(commitChanges(e))
});

class TenantsTable extends React.PureComponent {
  componentWillMount() {
    const tenants = agent.Tenants.getAll();
    this.props.onLoad(tenants);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const {
      sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      currentPage,
      pageSize,
      pageSizes,
      classes,
      onTableChange,
      rows,
      selection,
      searchValue,
      onCommitChanges,
      columns,
      tableColumnExtensions,
      mail,
      getRowId,
      expandedRowIds
    } = this.props;
    return (
      <Paper elevation={2}>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          className={classes.root}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={e => onTableChange("sorting", e)}
          />

          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={e => onTableChange("currentPage", e)}
            pageSize={pageSize}
            onPageSizeChange={e => onTableChange("pageSize", e)}
          />

          <SearchState
            value={searchValue}
            onValueChange={e => onTableChange("searchValue", e)}
          />
          {!mail && (
            <RowDetailState
              expandedRowIds={expandedRowIds}
              onExpandedRowIdsChange={e => onTableChange("expandedRowIds", e)}
            />
          )}
          {!mail && (
            <EditingState
              editingRowIds={editingRowIds}
              onEditingRowIdsChange={e => onTableChange("editingRowIds", e)}
              rowChanges={rowChanges}
              onRowChangesChange={e => onTableChange("rowChanges", e)}
              addedRows={addedRows}
              onAddedRowsChange={e => onTableChange("addedRows", e)}
              onCommitChanges={onCommitChanges}
              columnExtensions={tableColumnExtensions}
            />
          )}
          {mail && (
            <SelectionState
              selection={selection}
              onSelectionChange={e => onTableChange("selection", e)}
            />
          )}

          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          {mail && <IntegratedSelection />}
          <Table
            columnExtensions={tableColumnExtensions}
            messages={tableMessages}
          />
          <TableHeaderRow showSortingControls messages={sortingMessages} />
          {!mail && (
            <TableRowDetail
              contentComponent={props => (
                <GridDetailContainerBase
                  parentId={expandedRowIds[expandedRowIds.length - 1]}
                  {...props}
                />
              )}
            />
          )}
          <Toolbar />
          <SearchPanel messages={searchMessages} />
          {!mail && <TableEditRow />}
          {!mail && (
            <TableEditColumn
              width={110}
              showAddCommand={!addedRows.length}
              showEditCommand
              showDeleteCommand
              commandComponent={Command}
            />
          )}
          {mail && (
            <TableSelection showSelectAll selectByRowClick highlightRow />
          )}

          <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />

          {this.props.inProgress && <Loading />}
        </Grid>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TenantsTable));
