import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import logo from "./img/logo.png";
import NavItem from "./NavItem";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
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
  avatar: {
    marginRight: 10,
    width: 30,
    height: 30
  },
  appBody: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(3) + 54,
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: "1px solid slategrey"
    },
    "&::-webkit-scrollbar": {
      width: "1em"
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)"
    },
    width: "100%",
    height: "calc(100% - 90px)",
    overflow: "auto"
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  toolbar: { minHeight: 54 },
  drawer: {
    height: "100%"
  }
});

class ClippedDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar
            className={classes.toolbar}
            classes={{ regular: classes.toolbar }}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Avatar alt="Лесная гавань" src={logo} className={classes.avatar} />
            <Typography variant="h5" color="inherit" noWrap>
              Лесная Гавань
            </Typography>
          </Toolbar>
        </AppBar>

        <nav>
          <Hidden lgUp implementation="js" className={classes.drawer}>
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
                docked: classes.drawer
              }}
            >
              <div className={classes.toolbar} />
              <NavItem route="/" title="Рассылка" />
              <NavItem route="/Posts" title="Новости" />
              <NavItem route="/Projects" title="Проекты" />
              <NavItem route="/Tenants" title="Жильцы" />
              <NavItem route="/Content" title="Содержимое" />
              <NavItem route="/Bills" title="Счета" />
              <NavItem route="/SensorData" title="Показания" />
              <NavItem route="/Settings" title="Настройки" />
              <Divider />
              <NavItem route="/" title="Выйти" logout />
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="js" className={classes.drawer}>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
                docked: classes.drawer
              }}
              variant="permanent"
              open
            >
              <div className={classes.toolbar} />
              <NavItem route="/" title="Рассылка" />
              <NavItem route="/Posts" title="Новости" />
              <NavItem route="/Projects" title="Проекты" />
              <NavItem route="/Tenants" title="Жильцы" />
              <NavItem route="/Content" title="Содержимое" />
              <NavItem route="/Bills" title="Счета" />
              <NavItem route="/SensorData" title="Показания" />
              <NavItem route="/Settings" title="Настройки" />
              <Divider />
              <NavItem route="/" title="Выйти" logout />
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.appBody}>{this.props.children}</div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ClippedDrawer);
