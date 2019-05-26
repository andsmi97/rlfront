import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  mailTableColumns,
  mailTableColumnExtensions,
  mailRowId
} from "./Tenants/columnSettings";
import { CHANGE_MESSAGE_FIELD, EMAIL_SEND } from "../constants/actionTypes.js";
import { openSnack } from "../actions";
import agent from "../agent";
import Tenants from "./Tenants";
import Hidden from "@material-ui/core/Hidden";
const styles = {
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
    padding: 16
  },
  file: {
    listStyle: "none"
  }
};

const mapStateToProps = state => ({
  ...state.email,
  recievers: state.tenants.selection
});

const mapDispatchToProps = dispatch => {
  return {
    onMessageChange: (key, value) =>
      dispatch({ type: CHANGE_MESSAGE_FIELD, key, value }),
    openSnack: (type, message) => dispatch(openSnack(type, message)),
    onEmailSend: payload => dispatch({ type: EMAIL_SEND, payload })
  };
};

class EmailSender extends React.Component {
  onSubmit = () => {
    const {
      files,
      subjectField,
      messageField,
      openSnack,
      onEmailSend,
      recievers
    } = this.props;
    const sendFiles = () => {
      try {
        let formData = new FormData();
        files.forEach(file => {
          formData.append(`${file.name}`, file);
        });
        formData.append("subject", subjectField);
        formData.append("message", messageField);
        formData.append("recievers", JSON.stringify(recievers));
        onEmailSend(
          agent.Mail.send(formData).then(() =>
            openSnack("success", "Сообщения отправлены")
          )
        );
      } catch (e) {
        openSnack("error", "Возникла ошибка, повторите позже");
      }
    };

    const filesNumberArray = files.map(file => {
      return Number(file.name.match(/^(\d*)/)[0]);
    });
    const isFilesForEveryReciever =
      (filesNumberArray.length === recievers.length &&
        filesNumberArray
          .sort()
          .every((value, index) => value === recievers.sort()[index])) ||
      files.length === 0;

    //no recievers
    if (!recievers.length) {
      openSnack("error", "Не выбраны получатели");
      //canceling sending
      return;
    }

    //empty message
    if (
      subjectField.trim() === "" &&
      subjectField.trim() === "" &&
      !files.length
    ) {
      openSnack("error", "Вы собираетесь отправить пустое письмо");
      //canceling sending
      return;
    }
    if (!isFilesForEveryReciever) {
      if (
        window.confirm(
          "Количество файлов не соответсвует получателям, продолжить отправку?"
        )
      ) {
        return sendFiles();
      }
      //canceling sending
      return;
    }

    return sendFiles();
  };

  render() {
    const {
      classes,
      onMessageChange,
      files,
      isPending,
      subjectField,
      messageField
    } = this.props;
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={32}
        >
          <Hidden mdUp>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
              <Tenants
                mail
                columns={mailTableColumns}
                tableColumnExtensions={mailTableColumnExtensions}
                getRowId={mailRowId}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
            <Paper className={classes.paper}>
              <TextField
                id="subject"
                label="Тема сообщения"
                value={subjectField}
                margin="dense"
                variant="filled"
                onChange={e => onMessageChange("subjectField", e.target.value)}
              />
              <TextField
                id="message"
                label="Сообщение"
                multiline
                rows="12"
                className={classes.textField}
                margin="normal"
                variant="filled"
                value={messageField}
                onChange={e => onMessageChange("messageField", e.target.value)}
              />
              <section>
                <div>
                  <Dropzone
                    onDrop={files => onMessageChange("files", files)}
                    onFileDialogCancel={() => onMessageChange("files", [])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className={classes.dropZone}>
                        <input {...getInputProps()} />
                        <p>Перенесите сюда или выбирите файлы для загрузки.</p>
                      </div>
                    )}
                  </Dropzone>
                </div>
                {!(files.length < 1) ? (
                  <aside className="filestosend">
                    <h2>Отправляемые файлы</h2>
                    <ul>
                      {files.map(file => (
                        <li className={classes.file} key={file.name}>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : (
                  <aside />
                )}
              </section>

              <Button
                color="primary"
                className={classes.button}
                onClick={this.onSubmit}
                disabled={isPending}
              >
                Отправить
              </Button>
            </Paper>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
              <Tenants
                mail
                columns={mailTableColumns}
                tableColumnExtensions={mailTableColumnExtensions}
                getRowId={mailRowId}
              />
            </Grid>
          </Hidden>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EmailSender));
