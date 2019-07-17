import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import agent from "../agent";
export default props => {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState(props.subject);
  const [message, setMessage] = React.useState(props.message);
  const [houseNumber] = React.useState(props.houseNumber);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const onSubmit = () => {
    agent.Mail.sendBill({ subject, message, houseNumber, file: props.file });
  };
  return (
    <>
      <Button color="primary" onClick={handleClickOpen}>
        Отправить
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Отправка счета</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Тема"
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="message"
            label="Сообщение"
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
            multiline
            rowsMax="5"
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
};
