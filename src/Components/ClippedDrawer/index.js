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
  }

  onCancel() {
    this.setState({
      files: []
    });
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
            <Paper className="w55 h100 df jcc fdc">
              <TextField
                id="standard-dense"
                label="Тема сообщения"
                margin="dense"
                variant="filled"
              />
              <TextField
                id="filled-multiline-static"
                label="Сообщение"
                multiline
                rows="20"
                className={classes.textField}
                margin="normal"
                variant="filled"
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
              <Button color="primary" className={classes.button}>
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
