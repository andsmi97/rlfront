import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MultipleSelect from "../MultipleSelect";
import TextField from "@material-ui/core/TextField";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setSubjectField,
  setMessageField,
  setSendingFiles,
  removeSendingFiles,
  closeMessageSuccessPopUp,
  openMessageSuccessPopUp,
  resetEmailFields
} from "../../actions";
import ReactQuill from "react-quill";
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
    subjectField: state.changeEmailInputs.subjectField,
    messageField: state.changeEmailInputs.messageField,
    files: state.changeEmailInputs.files,
    selectedTenantsObject: state.requestTenants.selectedTenantsObject,
    snackMessageSend: state.handleSnackbars.snackMessageSend
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onMessageChange: event => dispatch(setMessageField(event.target.value)),
    onSubjectChange: event => dispatch(setSubjectField(event.target.value)),
    onDrop: files => dispatch(setSendingFiles(files)),
    onCancel: () => dispatch(removeSendingFiles()),
    onMessageSendSuccess: () => dispatch(openMessageSuccessPopUp()),
    onMessageSendSuccessClose: () => dispatch(closeMessageSuccessPopUp()),
    onResetMessageFields: () => dispatch(resetEmailFields())
  };
};
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", screen: "EmailSender" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image"
  ];

  render() {
    const {
      classes,
      onMessageChange,
      onSubjectChange,
      onDrop,
      onCancel,
      files
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
          <Paper className="leftpaper w55 h100 df jcc fdc mr2 p15">
            <TextField
              id="standard-dense"
              label="Заголовок новости"
              value={this.props.subjectField}
              margin="dense"
              variant="filled"
              onChange={onSubjectChange}
            />
            <ReactQuill
              modules={this.modules}
              formats={this.formats}
              value={this.state.text}
              onChange={this.handleChange}
            />

            <Button
              color="primary"
              className={classes.button}
              onClick={this.onSubmit}
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
