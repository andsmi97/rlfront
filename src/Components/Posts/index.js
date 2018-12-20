import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setTitleField,
  setBodyField,
  requestPosts,
  openInsertPostWindow,
  closeInsertPostWindow,
  openEditPostWindow,
  closeEditPostWindow,
  setEditTitleField,
  setEditBodyField,
  openInsertPostSuccessPopUp,
  openUpdatePostSuccessPopUp,
  openDeletePostSuccessPopUp,
  closeInsertPostSuccessPopUp,
  closeUpdatePostSuccessPopUp,
  closeDeletePostSuccessPopUp,
  resetInsertPostFields,
  resetUpdatePostFields
} from "./actions";
import { RENDER_NEW_POST, RENDER_UPDATE_POST } from "./constants";
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
    overflowY: "scroll", // So the Typography noWrap works
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
    // marginBottom: 15,
    // marginLeft: 15
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
    snackDelete: state.postsReducer.snackDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestPosts: () => dispatch(requestPosts()),
    onTitleChange: event => dispatch(setTitleField(event.target.value)),
    onEditTitleChange: event => dispatch(setEditTitleField(event.target.value)),
    onBodyChange: value => dispatch(setBodyField(value)),
    onEditBodyChange: value => dispatch(setEditBodyField(value)),
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
      dispatch({ type: RENDER_UPDATE_POST, payload: post })
  };
};
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "EmailSender", previewImage: "", insertFile: {} }; // You can also pass a Quill Delta here

    this.onChangeInsertFile = this.onChangeInsertFile.bind(this);
  }

  onSubmitPost = () => {
    let form = new FormData();
    form.append("file", this.state.insertFile);
    form.append("title", this.props.titleField);
    form.append("body", this.props.bodyField);
    form.append("site", "ozerodom.ru");

    fetch(`${BACKEND_URI}/addpost`, { method: "POST", body: form })
      // fetch(`${BACKEND_URI}/addpost`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     title: this.props.titleField,
      //     body: this.props.bodyField
      //   })
      // })
      .then(response => response.json())
      .then(response => this.props.renderNewPost(response))
      .then(() => this.props.onInsertionSuccess())
      .then(() => this.props.onResetInsertPostFields())
      .then(() => this.setState({ previewImage: "" }));
  };
  onSubmitUpdatePost = () => {
    fetch(`${BACKEND_URI}/updatepost`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.editPostID,
        title: this.props.editTitleField,
        body: this.props.editBodyField
      })
    })
      .then(response => response.json())
      .then(response => this.props.renderUpdatePost(response))
      .then(() => this.props.onUpdateSuccess())
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
          // insertFile: e.target.files[0]
        });
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
      onEditBodyChange,
      onEditTitleChange,
      editTitleField,
      subjectField,
      insertWindowOpened,
      editWindowOpended
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
                <ReactQuill
                  modules={this.modules}
                  formats={this.formats}
                  value={this.props.editBodyField}
                  onChange={onEditBodyChange}
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
          {/* // ContentProps={{ "aria-describedby": "message-id" }} */}
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
          {/* // ContentProps={{ "aria-describedby": "message-id" }} */}
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
