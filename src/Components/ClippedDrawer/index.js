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

// import { mailFolderListItems, otherMailFolderListItems } from './tileData';

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
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});
class ClippedDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
      message: "",
      subject: ""
    };
  }
  onDrop(files) {
    this.setState({
      files
    });
    console.log(this.state.files[0]);
  }
    onSubjectChange = (event) => {
        this.setState({ subject: event.target.value });
    };
  onMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };
//   onMessageChange(e) {
//     this.setState({ message: e.target.value });
//   }

  onCancel() {
    this.setState({
      files: []
    });
  }
  onSubmit = ()=> {
    let formData = new FormData();
    this.state.files.forEach(file=>{
        formData.append(`${file.name}`, file);
    })
    // formData.append("file", this.state.files[0]);
    // console.log(this.state.files[0]);
    formData.append("subject", this.state.subject);
    formData.append("message", this.state.message);
      fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData
    }).then(res=>console.log(res));
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Красное озеро
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
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
            <Paper className="w55 h100 df jcc fdc mr2">
              <TextField
                id="standard-dense"
                label="Тема сообщения"
                margin="dense"
                variant="filled"
                onChange={this.onSubjectChange}
              />
              <TextField
                id="filled-multiline-static"
                label="Сообщение"
                multiline
                rows="20"
                className={classes.textField}
                margin="normal"
                variant="filled"
                onChange={this.onMessageChange}
              />
              <section>
                <div>
                  <Dropzone
                    className="dropzone"
                    onDrop={this.onDrop.bind(this)}
                    onFileDialogCancel={this.onCancel.bind(this)}
                  >
                    <p сlassName="dropboxtext">
                      Перенесите сюда или выбирите файлы для загрузки.
                    </p>
                  </Dropzone>
                </div>
                <aside>
                  <h2>Dropped files</h2>
                  <ul>
                    {this.state.files.map(f => (
                      <li key={f.name}>
                        {f.name} - {f.size} bytes
                      </li>
                    ))}
                  </ul>
                </aside>
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

export default withStyles(styles)(ClippedDrawer);
