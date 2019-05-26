import * as React from "react";
import {
  SortingState,
  EditingState,
  PagingState,
  IntegratedPaging,
  IntegratedSorting,
  SelectionState,
  IntegratedSelection,
  SearchState,
  IntegratedFiltering
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
  SearchPanel
} from "@devexpress/dx-react-grid-material-ui";
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
import { commitChanges } from "./actions";
import Loading from "../Loader";

// const getRowId = row => row._id;

const styles = {
  root: {
    position: "relative"
  }
};

const mapStateToProps = state => ({ ...state.tenants });

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
      getRowId
    } = this.props;
    return (
      <Paper>
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
