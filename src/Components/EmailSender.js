import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
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
import { Typography } from "@material-ui/core";
import SendBillDialog from "./SendBillDialog";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MessageTemplateEditor from "./MessageTemplateEditor";
import FilledInput from "@material-ui/core/FilledInput";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import { format } from "date-fns";
const helpText = `
  В сообщении Вы можете использовать следующие конструкции: \n
  \${name}  - Фио жильца; \n
  \${email} - Email жильца; \n
  \${index} - Почтовый индекс жильца; \n
  \${address} - Полный адрес жильца; \n
  \${contract} - Договор с жильцом; \n

  Для того, чтобы отправить вложение по отдельности каждому жильцу,
  начало файла должно начинаться с номера жильца. Если у файла не будет
  номера в начале, то файл отправится всем жильцам.
`;

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
    padding: 16,
    marginBottom: 24
  },
  file: {
    listStyle: "none"
  },
  templateWrapper: {
    display: "flex",
    width: "100%",
    height: 50,
    marginBottom: 16
  },
  selectInput: {
    width: "100%"
  },
  selectRoot: { padding: "10px 12px" },
  select: { width: "100%" },
  selectWrapper: { width: "100%" },
  tooltipWrapper: {
    alignSelf: "flex-end"
  },
  editIcon: {
    marginLeft: 16,
    marginTop: 15,
    height: 40,
    width: 40,
    paddingTop: 7
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

const EmailSender = props => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [lastBillDate, setLastBillDate] = useState(null);
  const [templateTracker, setTemplateTracker] = useState(0);
  const onTemplateSelect = e => {
    setSelectedTemplate(e.target.value);
    let selectedItem =
      templates[
        templates.findIndex(template => template._id === e.target.value)
      ];
    //non-existen template
    selectedItem = selectedItem
      ? selectedItem
      : { subject: "", message: "", name: "" };
    props.onMessageChange("subjectField", selectedItem.subject);
    props.onMessageChange("messageField", selectedItem.message);
  };

  useEffect(() => {
    (async () => {
      setTemplates(await agent.MessageTemplate.all());
      const reqestedDate = (await agent.Bill.getLastBillDate()).lastBillDate;
      if (reqestedDate) {
        const newDate = new Date(reqestedDate);
        setLastBillDate(format(newDate, "dd/MM/yyyy"));
      }
    })();
  }, [templateTracker]);

  const onSubmit = () => {
    const {
      files,
      subjectField,
      messageField,
      openSnack,
      onEmailSend,
      recievers
    } = props;
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

  const {
    classes,
    onMessageChange,
    files,
    isPending,
    subjectField,
    messageField
  } = props;
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
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
          {lastBillDate && (
            <Paper className={classes.paper} elevation={2}>
              <Typography>
                Для отправки счетов за {lastBillDate}, нажмите на "Рассылка
                счетов"
              </Typography>
              <SendBillDialog type="mass" />
            </Paper>
          )}
          <Paper className={classes.paper} elevation={2}>
            <div className={classes.templateWrapper}>
              <div className={classes.selectWrapper}>
                <InputLabel htmlFor="message-template">
                  Шаблон сообщения
                </InputLabel>
                <Select
                  value={selectedTemplate}
                  onChange={onTemplateSelect}
                  autoWidth
                  classes={{ root: classes.selectRoot }}
                  className={classes.select}
                  input={
                    <FilledInput
                      name="message-template"
                      id="message-template"
                    />
                  }
                >
                  <MenuItem value={0} style={{ width: "100%" }}>
                    Не выбран
                  </MenuItem>
                  {templates.map(template => (
                    <MenuItem key={template._id} value={template._id}>
                      {template.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <MessageTemplateEditor
                setTemplateTracker={setTemplateTracker}
                selectedTemplate={selectedTemplate}
              />
            </div>
            <TextField
              id="subject"
              label="Тема сообщения"
              value={subjectField}
              margin="dense"
              variant="filled"
              onChange={e => onMessageChange("subjectField", e.target.value)}
            />
            <Tooltip title={helpText} className={classes.tooltipWrapper}>
              <HelpIcon />
            </Tooltip>
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
              onClick={onSubmit}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EmailSender));
