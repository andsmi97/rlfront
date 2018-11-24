import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MultipleSelect from "../MultipleSelect";
import TextField from "@material-ui/core/TextField";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  BACKEND_URI,
  SENDING_EMAIL_PENDING,
  SENDING_EMAIL_SUCCESS,
  SENDING_EMAIL_ERROR
} from "../../constants.js";
import {
  setSubjectField,
  setMessageField,
  setSendingFiles,
  removeSendingFiles,
  closeMessageSuccessPopUp,
  openMessageSuccessPopUp,
  resetEmailFields
} from "../../actions";

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
    marginTop: 40 // So the Typography noWrap works
  },
  dropZone: {
    position: "relative",
    width: "100%",
    height: "200px",
    borderWidth: "2px",
    borderColor: "rgba(102, 102, 102, 0.5)",
    borderStyle: "dashed",
    borderRadius: "5px",
    fontFamily: "Roboto",
    padding: "10px",
    boxSizing: "border-box",
    marginBottom: "10px"
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
  }
});

const mapStateToProps = state => {
  return {
    subjectField: state.changeEmailInputs.subjectField,
    messageField: state.changeEmailInputs.messageField,
    files: state.changeEmailInputs.files,
    selectedTenantsObject: state.requestTenants.selectedTenantsObject,
    snackMessageSend: state.handleSnackbars.snackMessageSend,
    isEmailPending: state.changeEmailInputs.isEmailPending
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
    onResetMessageFields: () => dispatch(resetEmailFields()),
    sendingEmailPending: () => dispatch({ type: SENDING_EMAIL_PENDING }),
    sendingEmailSuccess: () => dispatch({ type: SENDING_EMAIL_SUCCESS }),
    sendingEmailError: error =>
      dispatch({ type: SENDING_EMAIL_ERROR, payload: error })
  };
};

class EmailSender extends React.Component {
  onSubmit = () => {
    let formData = new FormData();
    this.props.files.forEach(file => {
      formData.append(`${file.name}`, file);
    });
    formData.append("subject", this.props.subjectField);
    formData.append("message", this.props.messageField);
    this.props.selectedTenantsObject.forEach(tenant => {
      formData.append(`${tenant.houseNumber}name`, tenant.name);
      formData.append(`${tenant.houseNumber}email`, tenant.email);
    });
    console.log(this.props.selectedTenantsObject);
    this.props.sendingEmailPending();
    fetch(`${BACKEND_URI}/mail`, { method: "POST", body: formData })
      .then(response => response.json())
      .then(() => this.props.sendingEmailSuccess())
      .then(() => this.props.onMessageSendSuccess())
      .then(() => this.props.onResetMessageFields())
      .catch(error => this.props.sendingEmailError(error));
  };

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
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <TextField
                id="standard-dense"
                label="Тема сообщения"
                value={this.props.subjectField}
                margin="dense"
                variant="filled"
                onChange={onSubjectChange}
              />
              <TextField
                id="filled-multiline-static"
                label="Сообщение"
                multiline
                rows="15"
                className={classes.textField}
                margin="normal"
                variant="filled"
                value={this.props.messageField}
                onChange={onMessageChange}
              />
              <section>
                <div>
                  <Dropzone
                    className={classes.dropZone}
                    onDrop={onDrop.bind(this)}
                    onFileDialogCancel={onCancel.bind(this)}
                  >
                    <p className="dropboxtext">
                      Перенесите сюда или выбирите файлы для загрузки.
                    </p>
                  </Dropzone>
                </div>
                {!(files.length < 1) ? (
                  <aside className="filestosend">
                    <h2>Отправляемые файлы</h2>
                    <ul>
                      {files.map(f => (
                        <li key={f.name}>
                          {f.name} - {f.size} bytes
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : (
                  <aside />
                )}
              </section>
              {this.props.isEmailPending ? (
                <div>
                  <CircularProgress className={classes.progress} />
                </div>
              ) : (
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.onSubmit}
                >
                  Отправить
                </Button>
              )}
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
      </main>
    );
  }
}

EmailSender.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EmailSender));
