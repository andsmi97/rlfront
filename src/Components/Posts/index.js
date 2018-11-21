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
import { setTitleField, setBodyField } from "./actions";
import ReactQuill from "react-quill";
import { BACKEND_URI } from "../../constants";
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
    overflowY: "scroll" // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

const mapStateToProps = state => {
  return {
    titleField: state.postsReducer.titleField,
    bodyField: state.postsReducer.bodyField
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTitleChange: event => dispatch(setTitleField(event.target.value)),
    onBodyChange: value => dispatch(setBodyField(value))
  };
};
class Posts extends React.Component {
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
  constructor(props) {
    super(props);
    this.state = { screen: "EmailSender" }; // You can also pass a Quill Delta here
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
          <MultipleSelect />
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
