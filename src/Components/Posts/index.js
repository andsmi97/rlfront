import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MultipleSelect from "../MultipleSelect";
import TextField from "@material-ui/core/TextField";
// import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
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
    onResetUpdatePostFields: () => dispatch(resetUpdatePostFields())
  };
};
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "EmailSender" }; // You can also pass a Quill Delta here
  }

  onSubmitPost = () => {
    fetch(`${BACKEND_URI}/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.props.titleField,
        body: this.props.bodyField
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onInsertionSuccess())
      .then(() => this.props.onResetInsertPostFields());
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
      .then(response => console.log(response))
      .then(() => this.props.onUpdateSuccess())
      .then(() => this.props.onResetUpdatePostFields());
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
        >
          <Grid item xs={8}>
            {insertWindowOpened && (
              <Paper className="leftpaper  df jcc fdc mr2 p15">
                <TextField
                  id="insert-title-field"
                  label="Заголовок новости"
                  value={subjectField}
                  margin="dense"
                  variant="filled"
                  onChange={onTitleChange}
                />
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
              <Paper className="leftpaper df jcc fdc mr2 p15">
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
            <Paper className="posts">
              {this.props.loadedPosts.map(post => {
                return (
                  <Post
                    title={post.title}
                    body={post.body}
                    postID={post._id}
                    key={post._id}
                  />
                );
              })}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <MultipleSelect />
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
            onClick={this.props.onOpenInsertPostWindow}
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
