import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { ARTICLE_DELETED } from "../../constants/actionTypes";
import { Paper } from "@material-ui/core";
import agent from "../../agent.js";
import { Link } from "react-router-dom";
const styles = {
  paper: {
    marginBottom: 30,
    padding: 30,
    paddingBottom: 5
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  article: {
    "& .image ": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    "& .image img": {
      maxWidth: "100%",
      objectFit: "contain"
    },
    "& ul, ol": {
      listStylePosition: "inside"
    },
    "& blockquote": {
      fontFamily:
        'freight-text-pro", "Merriweather", Georgia, Cambria, "Times New Roman", Times, serif',
      borderLeft: "3px solid rgba(0, 0, 0, 0.8)",
      fontStyle: "italic",
      fontWeight: 400,
      letterSpacing: "0.02rem",
      marginLeft: 0,
      paddingLeft: 15,
      marginBottom: 25,
      fontSize: "1.2em",
      lineHeight: "1.9em",
      marginTop: 20
    },
    "& p": {
      paddingBottom: 15,
      fontSize: "16px"
    },
    "& h2": {
      paddingBottom: 20
    }
  }
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch({ type: ARTICLE_DELETED, id })
  };
};

class Article extends React.Component {
  deleteArticle = async () => {
    if (window.confirm("Вы уверены что хотите удалить этого жильца?")) {
      await agent.Article.remove(this.props.id);
      this.props.onDelete(this.props.id);
    }
  };

  render() {
    const { classes, body, id, type } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: body }}
          className={classes.article}
        />
        <div className={classes.buttons}>
          <Button
            component={Link}
            size="small"
            color="primary"
            to={`/${type}/${id}`}
          >
            Редактировать
          </Button>
          <Button size="small" color="secondary" onClick={this.deleteArticle}>
            Удалить
          </Button>
        </div>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Article));
