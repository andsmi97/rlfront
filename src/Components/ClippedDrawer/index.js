import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmailIcon from "@material-ui/icons/Email";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import ContactIcon from "@material-ui/icons/ContactMail";
import NewsIcon from "@material-ui/icons/FormatAlignLeft";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MultipleSelect from "../MultipleSelect";
import TextField from "@material-ui/core/TextField";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import {
  setSubjectField,
  setMessageField,
  setSendingFiles,
  removeSendingFiles
} from "../../actions";
const mapStateToProps = state => {
  return {
    subjectField: state.changeEmailInputs.subjectField,
    messageField: state.changeEmailInputs.messageField,
    files: state.changeEmailInputs.files,
    selectedTenantsObject: state.requestTenants.selectedTenantsObject
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onMessageChange: event => dispatch(setMessageField(event.target.value)),
    onSubjectChange: event => dispatch(setSubjectField(event.target.value)),
    onDrop: files => dispatch(setSendingFiles(files)),
    onCancel: () => dispatch(removeSendingFiles())
  };
};
const drawerWidth = 240;

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
  drawerPaper: {
    position: "relative",
    width: drawerWidth
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

class ClippedDrawer extends React.Component {
  onSubmit = () => {
    let formData = new FormData();
    this.props.files.forEach(file => {
      formData.append(`${file.name}`, file);
    });
    formData.append("subject", this.props.subjectField);
    formData.append("message", this.props.messageField);
    Object.entries(this.props.selectedTenantsObject).forEach(tenant => {
      formData.append(`${tenant[0]}name`, tenant[1].name);
      formData.append(`${tenant[0]}email`, tenant[1].email);
    });
    fetch("http://localhost:3001/mail", {
      method: "POST",
      body: formData
    })
      .then(res => console.log(res))
      .catch(error => console.log(error));
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
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Красное озеро
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <ListItem button>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Рассылка" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NewsIcon />
            </ListItemIcon>
            <ListItemText primary="Новости" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Цены" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary="Контакты" />
          </ListItem>
        </Drawer>
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
                label="Тема сообщения"
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
                onChange={onMessageChange}
              />
              <section>
                <div>
                  <Dropzone
                    className="dropzone"
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
              <Button
                color="primary"
                className={classes.button}
                onClick={this.onSubmit}
              >
                Отправить
              </Button>
            </Paper>
            <MultipleSelect />
          </Grid>
        </main>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClippedDrawer));
// export default ClippedDrawer;
