import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import agent from "../agent";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import { makeStyles } from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import { connect } from "react-redux";
import { openSnack } from "../actions";
const useStyles = makeStyles(theme => ({
  selectRoot: { padding: "10px 12px" },
  select: { width: "100%" },
  selectWrapper: { width: "100%" },
  tooltipWrapper: {
    float: "right"
  }
}));

const helpText = `
  В сообщении Вы можете использовать следующие конструкции: \n
  \${name}  - Фио жильца; \n
  \${email} - Email жильца; \n
  \${index} - Почтовый индекс жильца; \n
  \${address} - Полный адрес жильца; \n
  \${contract} - Договор с жильцом; \n
`;

const mapDispatchToProps = dispatch => ({
  openSnack: (type, message) => dispatch(openSnack(type, message))
});
export default connect(
  null,
  mapDispatchToProps
)(props => {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { tenantId, file, type } = props;
  const classes = useStyles();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    setSubject(selectedItem.subject);
    setMessage(selectedItem.message);
  };

  useEffect(() => {
    if (open) {
      (async () => {
        setTemplates(await agent.MessageTemplate.all());
      })();
    }
    return () => setTemplates([]);
  }, [open]);

  const onSubmit = async () => {
    if (type === "single") {
      await agent.Mail.sendBill({ subject, message, tenantId, file });
      props.openSnack("success", "сообщения отправлены");
    }

    if (type === "mass") {
      agent.Mail.sendLastBills({ subject, message });
      props.openSnack("success", "сообщение отправлено");
    }

    setOpen(false);
  };

  return (
    <>
      <Button color="primary" onClick={handleClickOpen}>
        {type === "single" && "Отправить"}
        {type === "mass" && "Рассылка счетов"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Отправка счет{type === "single" ? "а" : "ов"}
        </DialogTitle>

        <DialogContent>
          <div className={classes.selectWrapper}>
            <InputLabel htmlFor="message-template">Шаблон сообщения</InputLabel>
            <Select
              value={selectedTemplate}
              onChange={onTemplateSelect}
              autoWidth
              classes={{ root: classes.selectRoot }}
              className={classes.select}
              input={
                <FilledInput name="message-template" id="message-template" />
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
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Тема"
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            fullWidth
            variant="filled"
          />
          {/* <div className={classes.tooltipWrapper}> */}
          <Tooltip title={helpText} className={classes.tooltipWrapper}>
            <HelpIcon />
          </Tooltip>
          {/* </div> */}
          <TextField
            margin="dense"
            id="message"
            label="Сообщение"
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
            multiline
            variant="filled"
            rowsMax="5"
            rows="5"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={onSubmit} color="primary">
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
