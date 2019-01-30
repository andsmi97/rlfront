import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MultipleSelect from "../MultipleSelect";
import TextField from "@material-ui/core/TextField";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BACKEND_URI } from "../../constants.js";
import {
  SENDING_EMAIL_PENDING,
  SENDING_EMAIL_SUCCESS,
  SENDING_EMAIL_ERROR
} from "./constants.js";
import { openSnack, openAlert } from "../../actions";
import {
  setSubjectField,
  setMessageField,
  setSendingFiles,
  removeSendingFiles,
  resetEmailFields
} from "./actions";
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
    marginTop: 60
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
    subjectField: state.emailReducer.subjectField,
    messageField: state.emailReducer.messageField,
    files: state.emailReducer.files,
    selectedTenantsObject: state.requestTenants.selectedTenantsObject,
    isEmailPending: state.emailReducer.isEmailPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMessageChange: event => dispatch(setMessageField(event.target.value)),
    onSubjectChange: event => dispatch(setSubjectField(event.target.value)),
    onDrop: files => dispatch(setSendingFiles(files)),
    onCancel: () => dispatch(removeSendingFiles()),
    openSnack: (type, message) => dispatch(openSnack(type, message)),
    openAlert: (message, alertFunction) =>
      dispatch(openAlert(message, alertFunction)),
    onResetMessageFields: () => dispatch(resetEmailFields()),
    sendingEmailPending: () => dispatch({ type: SENDING_EMAIL_PENDING }),
    sendingEmailSuccess: () => dispatch({ type: SENDING_EMAIL_SUCCESS }),
    sendingEmailError: err =>
      dispatch({ type: SENDING_EMAIL_ERROR, payload: err })
  };
};

class EmailSender extends React.Component {
  onSubmit = () => {
    const {
      files,
      subjectField,
      messageField,
      selectedTenantsObject,
      sendingEmailSuccess,
      openSnack,
      onResetMessageFields,
      sendingEmailPending
    } = this.props;
    const token = window.localStorage.getItem("token");
    const filesNumberArray = files.map(file => {
      return Number(file.name.match(/^(\d*)/)[0]);
    });
    const tenantsHouseNumbers = selectedTenantsObject.map(
      tenant => tenant.houseNumber
    );
    const isFilesForEveryReciever =
      (filesNumberArray.length === tenantsHouseNumbers.length &&
        filesNumberArray
          .sort()
          .every(
            (value, index) => value === tenantsHouseNumbers.sort()[index]
          )) ||
      files.length === 0;

    if (!isFilesForEveryReciever) {
      this.props.openAlert(
        "Количество файлов не соответсвует получателям, продолжить отправку?",
        () => {
          let formData = new FormData();
          files.forEach(file => {
            formData.append(`${file.name}`, file);
          });
          formData.append("subject", subjectField);
          formData.append("message", messageField);
          selectedTenantsObject.forEach(tenant => {
            formData.append(`${tenant.houseNumber}name`, tenant.name);
            formData.append(`${tenant.houseNumber}email`, tenant.email);
          });
          sendingEmailPending();
          fetch(`${BACKEND_URI}/mail`, {
            method: "POST",
            headers: {
              Authorization: token
            },
            body: formData
          })
            .then(response => response.json())
            .then(() => sendingEmailSuccess())
            .then(() => openSnack("success", "Сообщения отправлены"))
            .then(() => onResetMessageFields())
            .catch(error => openSnack("error","Возникла ошибка, повторите позже"));
        }
      );
    } else {
      let formData = new FormData();
      files.forEach(file => {
        formData.append(`${file.name}`, file);
      });
      formData.append("subject", subjectField);
      formData.append("message", messageField);
      selectedTenantsObject.forEach(tenant => {
        formData.append(`${tenant.houseNumber}name`, tenant.name);
        formData.append(`${tenant.houseNumber}email`, tenant.email);
      });
      sendingEmailPending();
      fetch(`${BACKEND_URI}/mail`, {
        method: "POST",
        headers: {
          Authorization: token
        },
        body: formData
      })
        .then(response => response.json())
        .then(() => sendingEmailSuccess())
        .then(() => openSnack("success", "Сообщения отправлены"))
        .then(() => onResetMessageFields())
        .catch(error => openSnack("error","Возникла ошибка, повторите позже"));
    }
    //UNCOMMENT DONT DELTE
  };

  render() {
    const {
      classes,
      onMessageChange,
      onSubjectChange,
      onDrop,
      onCancel,
      files,
      isEmailPending,
      subjectField,
      messageField
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
                value={subjectField}
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
                value={messageField}
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
                      {files.map(file => (
                        <li key={file.name}>
                          {file.name} - {file.size} байт
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : (
                  <aside />
                )}
              </section>
              {isEmailPending ? (
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
