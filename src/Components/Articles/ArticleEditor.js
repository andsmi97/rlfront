import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { Fab } from "@material-ui/core";
import Editor from "./Editor";
import agent from "../../agent";
import { Link } from "react-router-dom";
import {
  ARTICLESEDITOR_PAGE_LOADED,
  ARTICLESEDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ARTICLE_CHANGED
} from "../../constants/actionTypes";
import Loader from "../Loader";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "15px!important",
    backgroundColor: "rgba(255, 255, 255, 0)",
    boxShadow: "none"
  }
});

const mapStateToProps = state => ({ ...state.articles });

const mapDispatchToProps = dispatch => {
  return {
    onLoad: payload => dispatch({ type: ARTICLESEDITOR_PAGE_LOADED, payload }),
    onUnload: () => dispatch({ type: ARTICLESEDITOR_PAGE_UNLOADED }),
    onSubmit: payload => dispatch({ type: ARTICLE_SUBMITTED, payload }),
    onChange: payload => dispatch({ type: ARTICLE_CHANGED, payload })
  };
};

const placeholders = {
  Project: "Добавьте свой проект...",
  Post: "Добавьте свою новость..."
};
const buttonNames = {
  Project: { add: "Добавить проект", edit: "Обновить проект" },
  Post: { add: "Добавить новость", edit: "Обновить новость" }
};
class ArticlesEditor extends React.Component {
  async componentWillMount() {
    const { onLoad, id } = this.props;
    //editing
    if (id) {
      onLoad(await agent.Article.one(id));
    }
  }
  componentWillUnmount() {
    this.props.onUnload();
  }

  submit = async () => {
    const { body, id, type, onSubmit } = this.props;
    const promise = id
      ? agent.Article.update(id, { body })
      : agent.Article.create({ type, body });
    return onSubmit(await promise);
  };

  renderEditor() {
    const { body, isPending, id, type, onChange } = this.props;
    if (body && !isPending && id) {
      return (
        <Editor
          config={{
            onChange,
            buttonName: buttonNames[type].edit,
            content: body,
            readOnly: false,
            bodyPlaceholder: placeholders[type],
            onSubmit: this.submit
          }}
        />
      );
    } else if (!id) {
      return (
        <Editor
          config={{
            onChange,
            buttonName: buttonNames[type].add,
            readOnly: false,
            content: "",
            bodyPlaceholder: placeholders[type],
            onSubmit: this.submit
          }}
        />
      );
    } else {
      return <Loader />;
    }
  }
  render() {
    const { classes, type } = this.props;
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Paper className={classes.paper} elevation={2}>{this.renderEditor()}</Paper>
          </Grid>
        </Grid>
        <Fab
          component={Link}
          className={classes.fab}
          color="primary"
          to={`/${type}s`}
        >
          <CloseIcon />
        </Fab>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ArticlesEditor));
