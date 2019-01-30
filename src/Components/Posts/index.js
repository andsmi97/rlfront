import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
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
  resetInsertPostFields,
  resetUpdatePostFields
} from "./actions";
import { openSnack } from "../../actions";
import {
  RENDER_NEW_POST,
  RENDER_UPDATE_POST,
  SET_PREVIEW_POST_IMAGE_1,
  SET_UPLOAD_FILE_1,
  SET_DELETE_IMAGE,
  SET_DELETE_TO_FALSE
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
    editFile1: state.postsReducer.editFile1,
    previewEditImage1: state.postsReducer.previewEditImage1,
    editImage1: state.postsReducer.editImage1,
    deleteEditImage: state.postsReducer.deleteEditImage
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
    onSuccess: (type, message) => dispatch(openSnack(type, message)),
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
      }),
    setDeleteImage: () =>
      dispatch({
        type: SET_DELETE_IMAGE
      }),
    setDeleteToFalse: () => {
      dispatch({ type: SET_DELETE_TO_FALSE });
    }
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

    // this.onChangeInsertFile = this.onChangeInsertFile.bind(this);
  }

  onSubmitPost = () => {
    const token = window.localStorage.getItem("token");
    let form = new FormData();
    form.append("file", this.state.insertFile);
    form.append("title", this.props.titleField);
    form.append("body", this.props.bodyField);
    form.append("site", "ozerodom.ru");

    fetch(`${BACKEND_URI}/addpost`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(response => this.props.renderNewPost(response))
      .then(() => this.props.onSuccess("success", "Новость добавлена"))
      .then(() => this.props.onResetInsertPostFields())
      .then(() => this.setState({ previewImage: "" }));
  };
  onUpdatePost = () => {
    const token = window.localStorage.getItem("token");
    let form = new FormData();
    form.append("file", this.props.editFile1);
    form.append("title", this.props.editTitleField);
    form.append("body", this.props.editBodyField);
    form.append("image", this.props.editImage1);
    form.append("deleteimage", this.props.deleteEditImage);
    form.append("site", "ozerodom.ru");
    form.append("id", this.props.editPostID);
    fetch(`${BACKEND_URI}/updatepost`, {
      method: "PATCH",
      body: form,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(response => this.props.renderUpdatePost(response))
      .then(() => this.props.onSuccess("success", "Новость обновлена"))
      .then(() => this.props.onResetUpdatePostFields())
      .catch(error => console.log(error));
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
    this.props.setDeleteToFalse();
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
      previewEditImage1,
      loadedPosts,
      onCloseInsertPostWindow,
      onOpenInsertPostWindow,
      onCloseEditPostWindow
    } = this.props;
    const { previewImage } = this.state;
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
                {previewImage && (
                  <img
                    src={previewImage}
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
                  this.props.deleteEditImage && (
                    <img
                      src={previewEditImage1}
                      alt="upload"
                      width="100%"
                      height="400"
                      className={classes.img}
                    />
                  )
                ) : (
                  <img
                    src={editImage1}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                )}
                {this.props.deleteEditImage ? (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.props.setDeleteImage}
                  >
                    Восстановить изображение
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.props.setDeleteImage}
                  >
                    Удалить изображение
                  </Button>
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
                  onClick={this.onUpdatePost}
                >
                  Обновить новость
                </Button>
              </Paper>
            )}
            <Paper className={classes.paper}>
              {loadedPosts.map(post => {
                return (
                  <Post
                    title={post.title}
                    body={post.body}
                    id={post._id}
                    image={post.image}
                    key={post._id}
                  />
                );
              })}
            </Paper>
          </Grid>
        </Grid>
        {insertWindowOpened &&
          !editWindowOpended && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={onCloseInsertPostWindow}
            >
              <CloseIcon />
            </Button>
          )}
        {!insertWindowOpened &&
          editWindowOpended && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={onCloseEditPostWindow}
            >
              <CloseIcon />
            </Button>
          )}
        {!insertWindowOpened &&
          !editWindowOpended && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={() => {
                onOpenInsertPostWindow();
              }}
            >
              <AddIcon />
            </Button>
          )}
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
