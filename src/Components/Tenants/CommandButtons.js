import * as React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: "center" }}>
    <Button color="primary" onClick={onExecute} title="Добавить жильца">
      Добавить
    </Button>
  </div>
);

const EditButton = ({ onExecute, disabled }) => (
  <IconButton onClick={onExecute} title="Редактировать" disabled={disabled}>
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute, disabled }) => (
  <IconButton
    onClick={() => {
      if (window.confirm("Вы уверены что хотите удалить?")) {
        onExecute();
      }
    }}
    title="Удалить"
    disabled={disabled}
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Сохранить изменения">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Отменить изменения">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton
};

const CommandButtonComponent = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

export default CommandButtonComponent;
