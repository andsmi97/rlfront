import React, { Component } from "react";
import Drawer from "./Components/ClippedDrawer";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";
const styles = theme => ({
  root: {
    height: "100vh"
  },
});

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + " App"}>
        <Drawer />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
