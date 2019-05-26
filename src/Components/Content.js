import React, { Component } from "react";
import { connect } from "react-redux";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import {
  REORDER_LIST,
  CONTENT_LOADED,
  CONTENT_UNLOADED
} from "../constants/actionTypes";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import agent from "../agent";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "./Loader";

const styles = theme => ({
  img: {
    width: "100%",
    height: "100%"
  },
  title: {
    color: theme.palette.primary.main
  },
  titleBar: {
    background: "rgba(0,0,0,0.1)"
  },
  item: {
    listStyle: "none"
  }
});
const sizes = {
  xs: {
    carousel: 4,
    advertising: 6,
    genPlan: 6,
    gallery: 6,
    path: 4
  },
  md: {
    carousel: 4,
    advertising: 6,
    genPlan: 6,
    gallery: 4,
    path: 4
  },
  lg: {
    carousel: 3,
    advertising: 6,
    genPlan: 6,
    gallery: 3,
    path: 4
  }
};
const SortableItem = withStyles(styles)(
  SortableElement(({ value, classes, type }) => {
    return (
      <Grid item xs={sizes.xs[type]} md={sizes.md[type]} lg={sizes.lg[type]}>
        <GridListTile className={classes.item}>
          <img src={value} alt="" className={classes.img} />
          <GridListTileBar
            titlePosition="top"
            classes={{
              root: classes.titleBar,
              title: classes.title
            }}
            actionIcon={
              <React.Fragment>
                <IconButton>
                  <EditIcon className={classes.title} />
                </IconButton>
                <IconButton>
                  <DeleteIcon className={classes.title} />
                </IconButton>
              </React.Fragment>
            }
          />
        </GridListTile>
      </Grid>
    );
  })
);

const SortableList = SortableContainer(({ items, type }) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={32}
    >
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
          type={type}
        />
      ))}
    </Grid>
  );
});

const mapStateToProps = state => ({ ...state.content });

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: CONTENT_LOADED, payload }),
  onUnload: () => dispatch({ type: CONTENT_UNLOADED }),
  reorder: (section, payload) => {
    dispatch({
      type: REORDER_LIST,
      payload,
      section
    });
  }
});

const contentStyles = {
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    marginBottom: 32,
    background: "rgba(0,0,0,.01)"
  }
};
class Content extends Component {
  componentWillMount() {
    this.props.onLoad(agent.Content.all());
  }
  componentWillUnmount() {
    this.props.onUnload();
  }
  reorder = section => async payload => {
    const { oldIndex: from, newIndex: to } = payload;
    this.props.reorder(section, payload);
    await agent.Content.reorder(section, from, to);
  };
  render() {
    const {
      carousel,
      advertising,
      gallery,
      genPlan,
      path,
      isPending,
      classes
    } = this.props;
    if (isPending) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Карусель
        </Typography>
        <Paper className={classes.paper}>
          <SortableList
            items={carousel}
            type={"carousel"}
            onSortEnd={this.reorder("carousel")}
            axis="xy"
          />
        </Paper>
        <Typography variant="h5" gutterBottom>
          Реклама
        </Typography>
        <Paper className={classes.paper}>
          <SortableList
            items={advertising}
            type={"advertising"}
            onSortEnd={this.reorder("advertising")}
            axis="xy"
          />
        </Paper>
        <Typography variant="h5" gutterBottom>
          Галлерея
        </Typography>
        <Paper className={classes.paper}>
          <SortableList
            items={gallery}
            type={"gallery"}
            onSortEnd={this.reorder("gallery")}
            axis="xy"
          />
        </Paper>
        <Typography variant="h5" gutterBottom>
          Генеральный план
        </Typography>
        <Paper className={classes.paper}>
          <SortableList
            items={genPlan}
            type={"genPlan"}
            onSortEnd={this.reorder("genPlan")}
            axis="xy"
          />
        </Paper>
        <Typography variant="h5" gutterBottom>
          Путь
        </Typography>
        <Paper className={classes.paper}>
          <SortableList
            items={path}
            type={"path"}
            onSortEnd={this.reorder("path")}
            axis="xy"
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(contentStyles)(Content));
