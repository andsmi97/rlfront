import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setTitleField,
  setPostBodyField,
  requestPosts,
  openInsertPostWindow,
  closeInsertPostWindow,
  openEditPostWindow,
  closeEditPostWindow,
  setEditTitleField,
  setEditPostBodyField,
  openInsertPostSuccessPopUp,
  openUpdatePostSuccessPopUp,
  openDeletePostSuccessPopUp,
  closeInsertPostSuccessPopUp,
  closeUpdatePostSuccessPopUp,
  closeDeletePostSuccessPopUp,
  resetInsertPostFields,
  resetUpdatePostFields
} from "./actions";
import {
  RENDER_NEW_POST,
  RENDER_UPDATE_POST,
  SET_PREVIEW_POST_IMAGE_1,
  SET_UPLOAD_FILE_1
} from "./constants";
import ReactQuill from "react-quill";
import { BACKEND_URI } from "../../constants";
import Post from "./Post";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    minWidth: 0,
    overflowY: "scroll",
    marginTop: 40
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
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
  img: {
    objectFit: "cover"
  }
});

const mapStateToProps = state => {
  return {
    titleField: state.postsReducer.titleField,
    bodyField: state.postsReducer.bodyField,
    loadedPosts: state.postsReducer.loadedPosts,
    insertWindowOpened: state.postsReducer.insertWindowOpened,
    editWindowOpended: state.postsReducer.editWindowOpended,
    editTitleField: state.postsReducer.editTitleField,
    editBodyField: state.postsReducer.editBodyField,
    editPostID: state.postsReducer.editPostID,
    snackInsert: state.postsReducer.snackInsert,
    snackUpdate: state.postsReducer.snackUpdate,
    snackDelete: state.postsReducer.snackDelete,
    editFile1: state.postsReducer.editFile1,
    previewEditImage1: state.postsReducer.previewEditImage1,
    editImage1: state.postsReducer.editImage1
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestPosts: () => dispatch(requestPosts()),
    onTitleChange: event => dispatch(setTitleField(event.target.value)),
    onEditTitleChange: event => dispatch(setEditTitleField(event.target.value)),
    onBodyChange: value => dispatch(setPostBodyField(value)),
    onEditPostBodyChange: value => dispatch(setEditPostBodyField(value)),
    onOpenInsertPostWindow: () => dispatch(openInsertPostWindow()),
    onCloseInsertPostWindow: () => dispatch(closeInsertPostWindow()),
    onOpenEditPostWindow: () => dispatch(openEditPostWindow()),
    onCloseEditPostWindow: () => dispatch(closeEditPostWindow()),
    onInsertionSuccess: () => dispatch(openInsertPostSuccessPopUp()),
    onUpdateSuccess: () => dispatch(openUpdatePostSuccessPopUp()),
    onDeleteSuccess: () => dispatch(openDeletePostSuccessPopUp()),
    onInsertionSuccessClose: () => dispatch(closeInsertPostSuccessPopUp()),
    onUpdateSuccessClose: () => dispatch(closeUpdatePostSuccessPopUp()),
    onDeleteSuccessClose: () => dispatch(closeDeletePostSuccessPopUp()),
    onResetInsertPostFields: () => dispatch(resetInsertPostFields()),
    onResetUpdatePostFields: () => dispatch(resetUpdatePostFields()),
    renderNewPost: post => dispatch({ type: RENDER_NEW_POST, payload: post }),
    renderUpdatePost: post =>
      dispatch({ type: RENDER_UPDATE_POST, payload: post }),
    setPreviewImage1: e =>
      dispatch({
        type: SET_PREVIEW_POST_IMAGE_1,
        payload: e.target.result
      }),
    setUploadFile1: e =>
      dispatch({
        type: SET_UPLOAD_FILE_1,
        payload: e.target.files[0]
      })
  };
};
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "EmailSender",
      previewImage: "",
      insertFile: {},
      previewEditImage: "",
      editFile: {}
    };

    this.onChangeInsertFile = this.onChangeInsertFile.bind(this);
  }

  onSubmitPost = () => {
    let form = new FormData();
    form.append("file", this.state.insertFile);
    form.append("title", this.props.titleField);
    form.append("body", this.props.bodyField);
    form.append("site", "ozerodom.ru");

    fetch(`${BACKEND_URI}/addpost`, { method: "POST", body: form })
      .then(response => response.json())
      .then(response => this.props.renderNewPost(response))
      .then(() => this.props.onInsertionSuccess())
      .then(() => this.props.onResetInsertPostFields())
      .then(() => this.setState({ previewImage: "" }));
  };
  onSubmitUpdatePost = () => {
    let form = new FormData();
    form.append("file", this.props.editFile1);
    form.append("title", this.props.editTitleField);
    form.append("body", this.props.editBodyField);
    form.append("image", this.props.editImage1);
    form.append("site", "ozerodom.ru");
    form.append("id", this.props.editPostID);
    fetch(`${BACKEND_URI}/updatepost`, { method: "PATCH", body: form })
      .then(response => response.json())
      .then(response => this.props.renderUpdatePost(response))
      .then(() => this.props.onUpdateSuccess())
      .then(() => this.props.onResetUpdatePostFields())
      .catch(error => console.log(error));
    // fetch(`${BACKEND_URI}/updatepost`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     id: this.props.editPostID,
    //     title: this.props.editTitleField,
    //     body: this.props.editBodyField
    //   })
    // })
    //   .then(response => response.json())
    //   .then(response => this.props.renderUpdatePost(response))
    //   .then(() => this.props.onUpdateSuccess())
    //   .then(() => this.props.onResetUpdatePostFields())
    //   .catch(error => console.log(error));
  };
  scrollToMyRef = () => {
    console.log("imhere");
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
    console.log("done");
  };
  componentDidMount() {
    this.props.onRequestPosts();
  }

  modules = {
    toolbar: [
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "video"],
      ["clean"]
    ]
  };

  formats = [
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "video"
  ];

  onChangeInsertFile = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      this.setState({
        insertFile: e.target.files[0]
      });
      reader.onload = ev => {
        this.setState({
          previewImage: ev.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onChangeUpdateFile = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      this.props.setUploadFile1(e);
      reader.onload = ev => {
        this.props.setPreviewImage1(ev);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  render() {
    const {
      classes,
      onTitleChange,
      onBodyChange,
      bodyField,
      onEditPostBodyChange,
      onEditTitleChange,
      editTitleField,
      subjectField,
      insertWindowOpened,
      editWindowOpended,
      editImage1,
      previewEditImage1
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          ref={0}
        >
          <Grid item xs={8}>
            {insertWindowOpened && (
              <Paper className={classes.paper}>
                <TextField
                  id="insert-title-field"
                  label="Заголовок новости"
                  value={subjectField}
                  margin="dense"
                  variant="filled"
                  onChange={onTitleChange}
                />
                <Input type="file" onChange={this.onChangeInsertFile} />
                {this.state.previewImage && (
                  <img
                    src={this.state.previewImage}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                )}

                <ReactQuill
                  modules={this.modules}
                  formats={this.formats}
                  value={bodyField}
                  onChange={onBodyChange}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.onSubmitPost}
                >
                  Добавить новость
                </Button>
              </Paper>
            )}
            {editWindowOpended && (
              <Paper className={classes.paper}>
                <TextField
                  id="edit-title-field"
                  label="Заголовок новости"
                  value={editTitleField}
                  margin="dense"
                  variant="filled"
                  onChange={onEditTitleChange}
                />
                <Input type="file" onChange={this.onChangeUpdateFile} />
                {previewEditImage1 ? (
                  <img
                    src={previewEditImage1}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                ) : (
                  <img
                    src={editImage1}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                )}
                <ReactQuill
                  modules={this.modules}
                  formats={this.formats}
                  value={this.props.editBodyField}
                  onChange={onEditPostBodyChange}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.onSubmitUpdatePost}
                >
                  Обновить новость
                </Button>
              </Paper>
            )}
            <Paper className={classes.paper}>
              {this.props.loadedPosts.map(post => {
                return (
                  <Post
                    title={post.title}
                    body={post.body}
                    postID={post._id}
                    image={post.image}
                    key={post._id}
                  />
                );
              })}
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackMessageSend}
          autoHideDuration={6000}
          onClose={this.props.onMessageSendSuccessClose}
          ContentProps={{ "aria-describedby": "message-id" }}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onMessageSendSuccessClose}
            variant="success"
            message="Сообщения отправлены"
          />
        </Snackbar>

        {this.props.insertWindowOpened && !this.props.editWindowOpended && (
          <Button
            variant="fab"
            className={classes.fab}
            color="primary"
            onClick={this.props.onCloseInsertPostWindow}
          >
            <CloseIcon />
          </Button>
        )}
        {!this.props.insertWindowOpened && this.props.editWindowOpended && (
          <Button
            variant="fab"
            className={classes.fab}
            color="primary"
            onClick={this.props.onCloseEditPostWindow}
          >
            <CloseIcon />
          </Button>
        )}
        {!this.props.insertWindowOpened && !this.props.editWindowOpended && (
          <Button
            variant="fab"
            className={classes.fab}
            color="primary"
            onClick={() => {
              this.props.onOpenInsertPostWindow();
            }}
          >
            <AddIcon />
          </Button>
        )}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackInsert}
          autoHideDuration={6000}
          onClose={this.props.onInsertionSuccessClose}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onInsertionSuccessClose}
            variant="success"
            message="Новость добавлена"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.props.snackUpdate}
          autoHideDuration={6000}
          onClose={this.props.onUpdateSuccessClose}
        >
          <MySnackbarContentWrapper
            onClose={this.props.onUpdateSuccessClose}
            variant="success"
            message="Новость обновлена"
          />
        </Snackbar>
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
      </main>
    );
  }
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Posts));
