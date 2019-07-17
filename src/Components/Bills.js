import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import {
  SortingState,
  SelectionState,
  FilteringState,
  PagingState,
  GroupingState,
  RowDetailState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSelection
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableBandHeader,
  TableHeaderRow,
  TableFilterRow,
  TableSelection,
  TableGroupRow,
  TableRowDetail,
  GroupingPanel,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableColumnResizing,
  Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import { withStyles } from "@material-ui/core/styles";

import {
  generateRows,
  employeeValues,
  employeeTaskValues
} from "../../../demo-data/generator";

const columns = [
  { name: "prefix", title: "Title" },
  { name: "firstName", title: "First Name" },
  { name: "lastName", title: "Last Name" },
  { name: "birthDate", title: "Birth Date" },
  { name: "position", title: "Position" },
  { name: "state", title: "State" }
];

const detailColumns = [
  { name: "subject", title: "Subject" },
  { name: "startDate", title: "Start Date" },
  { name: "dueDate", title: "Due Date" },
  { name: "priority", title: "Priority" },
  { name: "status", title: "Status" }
];

const tableDetailColumnExtensions = [
  { columnName: "startDate", width: 115 },
  { columnName: "dueDate", width: 115 },
  { columnName: "priority", width: 100 },
  { columnName: "status", width: 125 }
];

const styles = theme => ({
  detailContainer: {
    margin: "20px"
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize
  }
});

export const GRID_STATE_CHANGE_ACTION = "GRID_STATE_CHANGE";

const GridDetailContainerBase = withStyles(styles)(({ row, classes }) => (
  <div className={classes.detailContainer}>
    <Paper>
      <Grid rows={row.tasks} columns={detailColumns}>
        <Table columnExtensions={tableDetailColumnExtensions} />
        <TableHeaderRow />
      </Grid>
    </Paper>
  </div>
));

// const GridDetailContainer = withStyles(styles, {
//   name: "ReduxIntegrationDemo"
// })(GridDetailContainerBase);

// const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

const GridContainer = ({
  editingRowIds,
  addedRows,
  rowChanges,
  classes,
  onTableChange,
  searchValue,
  onCommitChanges,
  columns,
  tableColumnExtensions,
  getRowId,
  rows,
  sorting,
  onSortingChange,
  expandedRowIds,
  onExpandedRowIdsChange,
  currentPage,
  onCurrentPageChange,
  pageSize,
  onPageSizeChange,
  pageSizes,
  columnWidths,
  onColumnWidthsChange
}) => (
  <Paper>
    <Grid rows={rows} columns={columns}>
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
      <RowDetailState
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={e => onTableChange("expandedRowIds", e)}
      />
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
      <IntegratedFiltering />
      <IntegratedSorting />
      <IntegratedPaging />

      <Table />

      <TableColumnResizing
        columnWidths={columnWidths}
        onColumnWidthsChange={onColumnWidthsChange}
      />
      <TableHeaderRow showSortingControls />
      <TableRowDetail contentComponent={GridDetailContainerBase} />
      <Toolbar />
      <SearchPanel messages={searchMessages} />
      <TableEditRow />
      <TableEditColumn
        width={110}
        showAddCommand={!addedRows.length}
        showEditCommand
        showDeleteCommand
        commandComponent={Command}
      />
      <PagingPanel pageSizes={pageSizes} />
      {this.props.inProgress && <Loading />}
    </Grid>
  </Paper>
);

const gridInitialState = {
  rows: generateRows({
    columnValues: {
      ...employeeValues,
      tasks: ({ random }) =>
        generateRows({
          columnValues: employeeTaskValues,
          length: Math.floor(random() * 3) + 4,
          random
        })
    },
    length: 40
  }),
  sorting: [],
  expandedRowIds: [1],
  currentPage: 0,
  pageSize: 10,
  pageSizes: [5, 10, 15],
  columnWidths: [
    { columnName: "prefix", width: 70 },
    { columnName: "firstName", width: 130 },
    { columnName: "lastName", width: 130 },
    { columnName: "position", width: 170 },
    { columnName: "state", width: 125 },
    { columnName: "birthDate", width: 115 }
  ]
};

const gridReducer = (state = gridInitialState, action) => {
  if (action.type === GRID_STATE_CHANGE_ACTION) {
    return {
      ...state,
      [action.partialStateName]: action.partialStateValue
    };
  }
  return state;
};

export const createGridAction = (partialStateName, partialStateValue) => ({
  type: GRID_STATE_CHANGE_ACTION,
  partialStateName,
  partialStateValue
});

const mapStateToProps = state => ({ ...state.tenants });

const mapDispatchToProps = dispatch => ({
  onTableChange: (key, value) =>
    dispatch({ type: CHANGE_TABLE_STATE, key, value }),
  onLoad: payload => dispatch({ type: TENANTS_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: TENANTS_PAGE_UNLOADED }),
  onCommitChanges: e => dispatch(commitChanges(e))
});

// const mapStateToProps = state => state;

// const mapDispatchToProps = dispatch => ({
//   onSortingChange: sorting => dispatch(createGridAction("sorting", sorting)),
//   onExpandedRowIdsChange: expandedRowIds =>
//     dispatch(createGridAction("expandedRowIds", expandedRowIds)),
//   onCurrentPageChange: currentPage =>
//     dispatch(createGridAction("currentPage", currentPage)),
//   onPageSizeChange: pageSize =>
//     dispatch(createGridAction("pageSize", pageSize)),
//   onColumnWidthsChange: widths =>
//     dispatch(createGridAction("columnWidths", widths))
// });

const ReduxGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer);

// const store = createStore(
//   gridReducer,
//   // Enabling Redux DevTools Extension (https://github.com/zalmoxisus/redux-devtools-extension)
//   // eslint-disable-next-line no-underscore-dangle
//   typeof window !== "undefined"
//     ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     : undefined
// );

// export default () => (
//   <Provider store={store}>
//     <ReduxGridContainer />
//   </Provider>
// );
