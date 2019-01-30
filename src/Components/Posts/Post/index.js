import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BACKEND_URI } from "../../../constants.js";
import { connect } from "react-redux";
import { openSnack, openAlert } from "../../../actions";
import { selectEditPost } from "../actions";
import { RENDER_DELETE_POST } from "../constants";
const styles = {
  card: {
    marginBottom: 20
  },
  media: {
    objectFit: "cover"
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: "2%",
    padding: "15px!important",
    paddingTop: "20px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    boxShadow: "none"
  },
  jcfe: {
    justifyContent: "flex-end"
  }
};

const mapStateToProps = state => {
  return {
    snackDelete: state.postsReducer.snackDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openSnack: (type, message) => dispatch(openSnack(type, message)),
    openAlert: (message, alertFunction) =>
      dispatch(openAlert(message, alertFunction)),
    onUpdatePostClick: id => dispatch(selectEditPost(id)),
    renderDeletePost: post =>
      dispatch({ type: RENDER_DELETE_POST, payload: post })
  };
};

class Post extends React.Component {
  // deletePost = () => {
  //   const { id, onSuccess, renderDeletePost } = this.props;
  //   const token = window.localStorage.getItem("token");
  //   fetch(`${BACKEND_URI}/deletepost`, {
  //     method: "delete",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token
  //     },

  //     body: JSON.stringify({ id })
  //   })
  //     .then(response => response.json())
  //     .then(response => renderDeletePost(response))
  //     .then(() => onSuccess("success", "Новость удалена"));
  // };

  deletePost = () => {
    console.log("deleteing");
    this.props.openAlert("Вы действительно хотите удалить новость?", () => {
      const { id, openSnack, renderDeletePost } = this.props;
      const token = window.localStorage.getItem("token");
      fetch(`${BACKEND_URI}/deletepost`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ id })
      })
        .then(response => response.json())
        .then(response => renderDeletePost(response))
        .then(() => openSnack("success", "Новость удалена"));
    });
  };

  render() {
    const { classes, title, body, image, onUpdatePostClick, id } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="400"
              image={image}
              title="Contemplative Reptile"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              component="p"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.jcfe}>
          <Button
            size="small"
            color="primary"
            onClick={() => onUpdatePostClick(id)}
          >
            Редактировать
          </Button>
          <Button size="small" color="secondary" onClick={this.deletePost}>
            Удалить
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post));
