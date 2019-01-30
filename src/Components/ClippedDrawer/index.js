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
import PeopleIcon from "@material-ui/icons/People";
import NewsIcon from "@material-ui/icons/FormatAlignLeft";
import ImageIcon from "@material-ui/icons/Image";
import ProjectIcon from "@material-ui/icons/Home";
import Posts from "../Posts";
import Projects from "../Projects";
import SectionImages from "../SectionImages";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Settings from "../Settings";
import classNames from "classnames";
import Tariffs from "../Tariffs";
import Avatar from "@material-ui/core/Avatar";
import logo from "./img/logo.png";
import Tenants from "../Tenants";
import {} from "../../actions";
import EmailSender from "../EmailSender";

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    height: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: 240,
    padding: "5px"
  },
  typography: {
    useNextVariants: true
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  toolbar: theme.mixins.toolbar
});

class ClippedDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "EmailSender" };
  }

  changeSection = screen => {
    this.setState({ screen });
  };

  render() {
    const { classes } = this.props;
    const {screen} = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Avatar
              alt="Лесная гавань"
              src={logo}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <Typography variant="title" color="inherit" noWrap>
              Лесная Гавань
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <ListItem />
          <ListItem button onClick={() => this.changeSection("EmailSender")}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Рассылка" />
          </ListItem>
          <ListItem button onClick={() => this.changeSection("News")}>
            <ListItemIcon>
              <NewsIcon />
            </ListItemIcon>
            <ListItemText primary="Новости" />
          </ListItem>
          <ListItem button onClick={() => this.changeSection("Projects")}>
            <ListItemIcon>
              <ProjectIcon />
            </ListItemIcon>
            <ListItemText primary="Проекты" />
          </ListItem>
          <ListItem button onClick={() => this.changeSection("Tenants")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Жильцы" />
          </ListItem>
          <ListItem button onClick={() => this.changeSection("Tariffs")}>
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Тарифы" />
          </ListItem>
          <ListItem button onClick={() => this.changeSection("SectionImages")}>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="Содержимое" />
          </ListItem>
          <ListItem button onClick={() => this.changeSection("Settings")}>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItem>
        </Drawer>
        {screen === "EmailSender" && <EmailSender />}
        {screen === "News" && <Posts />}
        {screen === "Tariffs" && <Tariffs />}
        {screen === "Tenants" && <Tenants />}
        {screen === "Settings" && <Settings />}
        {screen === "SectionImages" && <SectionImages />}
        {screen === "Projects" && <Projects />}
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
