import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Article from "./Article";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import agent from "../../agent";
import {
  ARTICLES_PAGE_LOADED,
  ARTICLES_PAGE_UNLOADED
} from "../../constants/actionTypes";

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
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0)",
    boxShadow: "none"
  }
});

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isPending: state.articles.isPending
});

const mapDispatchToProps = dispatch => {
  return {
    onLoad: payload => dispatch({ type: ARTICLES_PAGE_LOADED, payload }),
    onUnload: () => dispatch({ type: ARTICLES_PAGE_UNLOADED })
  };
};

class Articles extends React.Component {
  async componentWillMount() {
    const { onLoad, type } = this.props;
    onLoad(await agent.Article.all(type, 0));
  }
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { classes, articles, type } = this.props;
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
            <Paper className={classes.paper} elevation={2}>
              {articles.map(article => {
                return (
                  <Article
                    body={article.body}
                    id={article._id}
                    key={article._id}
                    type={type}
                  />
                );
              })}
            </Paper>
          </Grid>
        </Grid>
        <Fab
          component={Link}
          className={classes.fab}
          color="primary"
          to={`/admin/new${type}`}
        >
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Articles));
