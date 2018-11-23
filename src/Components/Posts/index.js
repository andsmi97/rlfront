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
import { setTitleField, setBodyField, requestPosts } from "./actions";
import ReactQuill from "react-quill";
import { BACKEND_URI } from "../../constants";
import Post from "./Post";
import AddIcon from "@material-ui/icons/Add";

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
    loadedPosts: state.postsReducer.loadedPosts
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestPosts: () => dispatch(requestPosts()),
    onTitleChange: event => dispatch(setTitleField(event.target.value)),
    onBodyChange: value => dispatch(setBodyField(value))
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
    }).then(response => console.log(response));
    // .then(() => this.props.onInsertionSuccess())
    // .then(() => this.props.onResetTenantInsertFields());
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
    const { classes, onTitleChange, onBodyChange, bodyField } = this.props;
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
            <Paper className="leftpaper w55 h100 df jcc fdc mr2 p15">
              <TextField
                id="standard-dense"
                label="Заголовок новости"
                value={this.props.subjectField}
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
        {/* <Zoom
          key={'primary'}
          in={this.state.value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              this.state.value === index ? transitionDuration.exit : 0
            }ms`
          }}
          unmountOnExit
        > */}
          <Button variant="fab" className={classes.fab} color="primary">
           <AddIcon/>
          </Button>
        {/* </Zoom> */}
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
