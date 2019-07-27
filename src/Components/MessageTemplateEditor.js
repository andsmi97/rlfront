import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import { makeStyles } from "@material-ui/styles";
import agent from "../agent";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { openSnack } from "../actions";

const helpText = `
  В сообщении Вы можете использовать следующие конструкции: \n
  \${name}  - Фио жильца; \n
  \${email} - Email жильца; \n
  \${index} - Почтовый индекс жильца; \n
  \${address} - Полный адрес жильца; \n
  \${contract} - Договор с жильцом; \n
`;

const useStyles = makeStyles(theme => ({
  selectRoot: { padding: "10px 12px" },
  select: { width: "100%" },
  selectWrapper: { width: "100%" },
  tooltipWrapper: {
    float: "right"
  },
  editIcon: {
    marginLeft: 16,
    marginTop: 15,
    height: 40,
    width: 40,
    paddingTop: 7
  },
  dialogTitleWrapper: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const mapDispatchToProps = dispatch => ({
  openSnack: (type, message) => dispatch(openSnack(type, message))
});

export default connect(
  null,
  mapDispatchToProps
)(props => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const handleClickOpen = () => {
    onTemplateSelect({ target: { value: props.selectedTemplate } });
    setOpen(true);
  };
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
    setName(selectedItem.name);
  };
  useEffect(() => {
    (async () => {
      setTemplates(await agent.MessageTemplate.all());
    })();
  }, [open]);
  const onSubmit = async e => {
    e.preventDefault();
    //creting template
    if (selectedTemplate === 1) {
      setTemplates(
        [...templates.filter(template => template._id !== 1)],
        await agent.MessageTemplate.create({ message, subject, name })
      );
      props.setTemplateTracker(state => state + 1);

      setOpen(false);
      props.openSnack("success", "Шаблон создан");
      return;
    }
    //updating template
    agent.MessageTemplate.update(selectedTemplate, { name, subject, message });
    props.openSnack("success", "Шаблон изменен");
    props.setTemplateTracker(state => state + 1);
    setOpen(false);
  };
  const onDelete = async () => {
    if (window.confirm("Вы уверены что хотите удалить этот шаблон?")) {
      setTemplates(
        templates.filter(template => template._id !== selectedTemplate)
      );
      await agent.MessageTemplate.remove(selectedTemplate);
      if (templates.length === 0) {
        return onTemplateSelect({ target: { value: 0 } });
      }
      onTemplateSelect({ target: { value: templates[0]._id } });
    }
  };
  // 1 - id for new item
  const onCreate = () => {
    if (templates.findIndex(item => item._id === 1) !== -1) {
      setSelectedTemplate(1);
      return;
    }
    setTemplates([
      ...templates,
      { _id: 1, name: "Новый Шаблон", subject: "", message: "" }
    ]);
    setSelectedTemplate(1);
    setName("Новый шаблон");
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        title="Редактировать"
        className={classes.editIcon}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={onSubmit}>
          <DialogTitle
            id="form-dialog-title"
            className={classes.dialogTitleWrapper}
          >
            Редактор шаблонов сообщений
            <IconButton
              title="Добавить шаблон"
              color="primary"
              onClick={onCreate}
            >
              <AddIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <div>
              <InputLabel htmlFor="message-template">
                Шаблон сообщения
              </InputLabel>
              <Select
                value={selectedTemplate}
                onChange={onTemplateSelect}
                classes={{ root: classes.selectRoot }}
                className={classes.select}
                input={
                  <FilledInput name="message-temp" id="message-template" />
                }
              >
                <MenuItem value={0}>Не выбран</MenuItem>
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
              id="name"
              label="Название шаблона"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              variant="filled"
            />
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
            <Tooltip title={helpText} className={classes.tooltipWrapper}>
              <HelpIcon />
            </Tooltip>
            <TextField
              margin="dense"
              id="message"
              label="Сообщение"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              fullWidth
              multiline
              rowsMax="10"
              rows="10"
              variant="filled"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={onDelete} color="secondary">
              Удалить
            </Button>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
});
