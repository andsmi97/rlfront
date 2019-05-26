import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  container: {
    position: "absolute",
    fontSize: 20,
    top: "calc(45% - 10px)",
    left: "calc(50% - 10px)"
  }
};
class Loader extends React.Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <CircularProgress />
      </div>
    );
  }
}

export default withStyles(styles)(Loader);
