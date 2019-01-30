import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class DeleteAlert extends React.Component {
  render() {
    const { open, handleClose, message, handleAccept } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
                <Button onClick={handleAccept} color="primary" autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteAlert;
