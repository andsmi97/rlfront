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
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../MySnackbarContentWrapper";
import { BACKEND_URI } from "../../../constants.js";
import { connect } from "react-redux";
import {
  openDeletePostSuccessPopUp,
  closeDeletePostSuccessPopUp
} from "../actions";
//postS actions
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
    boxShadow: "none",
    // marginBottom: 15,
    // marginLeft: 15
  }
};

const mapStateToProps = state => {
  return {
    snackDelete: state.postsReducer.snackDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteSuccess: () => dispatch(openDeletePostSuccessPopUp()),
    onDeleteSuccessClose: () => dispatch(closeDeletePostSuccessPopUp()),
    onUpdatePostClick: id => dispatch(selectEditPost(id)),
    renderDeletePost: post =>
      dispatch({ type: RENDER_DELETE_POST, payload: post })
  };
};

class Post extends React.Component {
  deletePost = () => {
    fetch(`${BACKEND_URI}/deletepost`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.postID
      })
    })
      .then(response => response.json())
      .then(response => this.props.renderDeletePost(response))
      .then(() => this.props.onDeleteSuccess());
  };
  render() {
    const { classes, title, body, image } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="400"
            image={image}
            title="Contemplative Reptile"
          />
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
        <CardActions className="jcfe">
          {/* <Button size="small" color="primary">
            Подробнее
          </Button> */}
          <Button
            size="small"
            color="primary"
            onClick={() => this.props.onUpdatePostClick(this.props.postID)}
          >
            Редактировать
          </Button>
          <Button size="small" color="secondary" onClick={this.deletePost}>
            Удалить
          </Button>
        </CardActions>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackDelete}
          autoHideDuration={6000}
          onClose={this.props.onDeleteSuccessClose}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onDeleteSuccessClose}
            variant="success"
            message="Новость Удалена"
          />
        </Snackbar>
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
