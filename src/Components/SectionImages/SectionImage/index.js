import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../MySnackbarContentWrapper";
import { BACKEND_URI } from "../../../constants.js";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import {
  openDeletePostSuccessPopUp,
  closeDeletePostSuccessPopUp
} from "../actions";
//postS actions
import { selectEditPost } from "../actions";
import { RENDER_DELETE_POST } from "../constants";
const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    minWidth: 0,
    overflowY: "scroll", // So the Typography noWrap works
    marginTop: 60,
    paddingLeft: 20
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  card: {
    maxWidth: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
    // marginBottom: 15,
    // marginLeft: 15
  }
});

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

class SectionImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: {} };
    this.updatePhoto = this.updatePhoto.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }
  //TODO CHANGE DELETE
  deletePhoto = () => {
    fetch(`${BACKEND_URI}/deletePhoto`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site: "ozerodom.ru",
        section: this.props.item.section,
        photo: this.props.item.content
      })
    }).then(response => response.json());
    // .then(response => this.props.renderDeletePost(response))
    // .then(() => this.props.onDeleteSuccess());
  };
  //TODO CHANGE UPDATE
  updatePhoto = event => {
    let formData = new FormData();
    formData.append(`file`, event.target.files[0]);
    formData.append("site", "ozerodom.ru");
    formData.append("section", this.props.item.section);
    formData.append("oldPhoto", this.props.item.content);
    // this.props.sendingEmailPending();
    fetch(`${BACKEND_URI}/updatePhoto`, {
      method: "POST",
      body: formData
    }).then(response => response.json());
    // .then(response => this.props.renderDeletePost(response))
    // .then(() => this.props.onDeleteSuccess());
  };


  onFileChange = event => {
    let file = event.target.files[0];
    console.log(file);
    this.setState({
      file
    });
  };
  render() {
    const { classes, item } = this.props;
    return (
      <Card className={classes.card}>
        <CardActions className={classes.actions} disableActionSpacing>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={this.updatePhoto}
          />
          <label htmlFor="raised-button-file">
            <IconButton aria-label="Edit" component="span">
              <EditIcon />
            </IconButton>
          </label>
          <IconButton aria-label="Delete" onClick={this.deletePhoto}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardMedia
          className={classes.media}
          image={item.content}
          title="Лесная гавань"
        />
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

SectionImage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SectionImage));
