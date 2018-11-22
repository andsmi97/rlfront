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
import Posts from "../Posts";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";

import {
  setSubjectField,
  setMessageField,
  setSendingFiles,
  removeSendingFiles,
  closeMessageSuccessPopUp,
  openMessageSuccessPopUp,
  resetEmailFields
} from "../../actions";
import EmailSender from "../EmailSender";

const mapStateToProps = state => {
  return {
    subjectField: state.changeEmailInputs.subjectField,
    messageField: state.changeEmailInputs.messageField,
    files: state.changeEmailInputs.files,
    selectedTenantsObject: state.requestTenants.selectedTenantsObject,
    snackMessageSend: state.handleSnackbars.snackMessageSend
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onMessageChange: event => dispatch(setMessageField(event.target.value)),
    onSubjectChange: event => dispatch(setSubjectField(event.target.value)),
    onDrop: files => dispatch(setSendingFiles(files)),
    onCancel: () => dispatch(removeSendingFiles()),
    onMessageSendSuccess: () => dispatch(openMessageSuccessPopUp()),
    onMessageSendSuccessClose: () => dispatch(closeMessageSuccessPopUp()),
    onResetMessageFields: () => dispatch(resetEmailFields())
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
  constructor(props) {
    super(props);
    this.state = { text: "", screen: "EmailSender" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image"
  ];


  onClickEmailSender = e => {
    this.setState({ screen: "EmailSender" });
  };
  onClickNews = e => {
    this.setState({ screen: "News" });
  };
  render() {
    const {
      classes
    } = this.props;

    if (this.state.screen === "EmailSender") {
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
            <ListItem button onClick={this.onClickEmailSender}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Рассылка" />
            </ListItem>
            <ListItem button onClick={this.onClickNews}>
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
          {/* {(this.state.screen === "EmailSender") ? (<EmailSender />) : (<div />)} */}
          <EmailSender />
        </div>
      );
    } else {
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
            <ListItem onClick={this.onClickEmailSender} button>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Рассылка" />
            </ListItem>
            <ListItem button onClick={this.onClickNews}>
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
          <Posts />
          {/* {(this.state.screen === "EmailSender") ? (<News />) : (<div />)} */}
          {/* <EmailSender /> */}
        </div>
      );
    }

    //   {/* <ReactQuill
    //     modules={this.modules}
    //     formats={this.formats}
    //     value={this.state.text}
    //     onChange={this.handleChange}
    //   /> */}
    // {/* </div> */}
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
