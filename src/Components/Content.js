import React, { Component } from "react";
import { connect } from "react-redux";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import {
  REORDER_LIST,
  CONTENT_LOADED,
  CONTENT_UNLOADED,
  CONTENT_UPDATED,
  CONTENT_DELETED,
  CONTENT_ADDED,
  ON_SALES_TEXT_CHANGE
} from "../constants/actionTypes";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import agent from "../agent";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "./Loader";
import { Button } from "@material-ui/core";
import { openSnack } from "../actions";
const styles = theme => ({
  container: {
    height: "250px",
    width: "100%",
    overflow: "hidden",
    position: "relative"
  },
  imageHeader: {
    height: 50,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    background: "rgba(255,255,255,.3)"
  },
  img: {
    objectFit: "cover",
    height: "100%",
    minWidth: "100%"
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
  SortableElement(({ index, value, classes, type, onDelete, onUpdate }) => {
    const deletePhoto = async () => {
      if (window.confirm("Вы уверены что хотите удалить фото?")) {
        onDelete(type, index);
        //sending value instead of index since mongo is easier with values;
        await agent.Content.remove(type, value);
      }
    };
    const updatePhoto = async event => {
      const formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      formData.append("section", type);
      formData.append("index", index);
      const updatedCategory = await agent.Content.update(formData);
      onUpdate(type, updatedCategory);
    };
    return (
      <Grid item xs={sizes.xs[type]} md={sizes.md[type]} lg={sizes.lg[type]}>
        <div className={classes.container}>
          <div className={classes.imageHeader}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id={`${type}-${index}`}
              type="file"
              onChange={updatePhoto}
            />
            <label htmlFor={`${type}-${index}`}>
              <IconButton
                aria-label="Edit"
                component="span"
                className={classes.title}
              >
                <EditIcon />
              </IconButton>
            </label>
            <IconButton onClick={deletePhoto} className={classes.title}>
              <DeleteIcon />
            </IconButton>
          </div>
          <img src={value} alt="" className={classes.img} />
        </div>
      </Grid>
    );
  })
);

const SortableList = SortableContainer(
  ({ items, type, onDelete, onUpdate }) => {
    return (
      <Grid container direction="row" alignItems="flex-start" spacing={3}>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            type={type}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </Grid>
    );
  }
);

const mapStateToProps = state => ({ ...state.content });

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: CONTENT_LOADED, payload }),
  onUnload: () => dispatch({ type: CONTENT_UNLOADED }),
  onCreate: payload => dispatch({ type: CONTENT_ADDED, payload }),
  onDelete: (section, id) => dispatch({ type: CONTENT_DELETED, section, id }),
  openSnack: (type, message) => dispatch(openSnack(type, message)),
  onSalesTextChange: payload =>
    dispatch({ type: ON_SALES_TEXT_CHANGE, payload }),
  onUpdate: (section, values) =>
    dispatch({ type: CONTENT_UPDATED, section, values }),
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
  },
  title: {
    display: "flex",
    justifyContent: "space-between"
  },
  saveButton: {
    marginBottom: 16
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
  addPhoto = section => async event => {
    const formData = new FormData();
    formData.append(`file`, event.target.files[0]);
    formData.append("section", section);
    this.props.onCreate(await agent.Content.create(formData));
  };
  saveText = async () => {
    await agent.Content.changeSalesText(this.props.salesText);
    this.props.openSnack("success", "Текст сохранен");
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
        <div className={classes.title}>
          <Typography variant="h5" gutterBottom>
            Карусель
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id={`add-carousel`}
            type="file"
            onChange={this.addPhoto("carousel")}
          />

          <Button color="primary">
            <label htmlFor={`add-carousel`} color="primary">
              Добавить Фото
            </label>
          </Button>
        </div>
        <Paper className={classes.paper} elevation={2}>
          <SortableList
            items={carousel}
            type={"carousel"}
            onSortEnd={this.reorder("carousel")}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            axis="xy"
            pressDelay={200}
          />
        </Paper>
        <div className={classes.title}>
          <Typography variant="h5" gutterBottom>
            Реклама
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id={`add-advertising`}
            type="file"
            onChange={this.addPhoto("advertising")}
          />

          <Button color="primary" aria-label="add">
            <label htmlFor={`add-advertising`} color="primary">
              Добавить Фото
            </label>
          </Button>
        </div>
        <Paper className={classes.paper} elevation={2}>
          <TextField
            id="add-sales-text"
            label="Рекламный текст"
            margin="dense"
            onBlur={event => this.props.onSalesTextChange(event.target.value)}
            defaultValue={this.props.salesText}
            variant="filled"
          />
          <Button
            color="primary"
            aria-label="add"
            className={classes.saveButton}
            onClick={this.saveText}
          >
            Cохранить текст
          </Button>
          <SortableList
            items={advertising}
            type={"advertising"}
            onSortEnd={this.reorder("advertising")}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            axis="xy"
            pressDelay={200}
          />
        </Paper>
        <div className={classes.title}>
          <Typography variant="h5" gutterBottom>
            Галлерея
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id={`add-gallery`}
            type="file"
            onChange={this.addPhoto("gallery")}
          />

          <Button color="primary" aria-label="add">
            <label htmlFor={`add-gallery`}>Добавить Фото</label>
          </Button>
        </div>

        <Paper className={classes.paper} elevation={2}>
          <SortableList
            items={gallery}
            type={"gallery"}
            onSortEnd={this.reorder("gallery")}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            axis="xy"
            pressDelay={200}
          />
        </Paper>
        <div className={classes.title}>
          <Typography variant="h5" gutterBottom>
            Генеральный План
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id={`add-genplan`}
            type="file"
            onChange={this.addPhoto("genPlan")}
          />

          <Button color="primary" aria-label="add">
            <label htmlFor={`add-genplan`}>Добавить Фото</label>
          </Button>
        </div>
        <Paper className={classes.paper} elevation={2}>
          <SortableList
            items={genPlan}
            type={"genPlan"}
            onSortEnd={this.reorder("genPlan")}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            axis="xy"
            pressDelay={200}
          />
        </Paper>
        <div className={classes.title}>
          <Typography variant="h5" gutterBottom>
            Путь
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id={`add-path`}
            type="file"
            onChange={this.addPhoto("path")}
          />

          <Button color="primary" aria-label="add">
            <label htmlFor={`add-path`}>Добавить Фото</label>
          </Button>
        </div>
        <Paper className={classes.paper} elevation={2}>
          <SortableList
            items={path}
            type={"path"}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            onSortEnd={this.reorder("path")}
            axis="xy"
            pressDelay={200}
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
