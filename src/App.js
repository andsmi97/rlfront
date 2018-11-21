import React, { Component } from "react";
import Drawer from "./Components/ClippedDrawer";
import { connect } from "react-redux";
import "./App.css";

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawer />
      </div>

    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
