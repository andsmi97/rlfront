import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DanteEditor from "./DanteEditor";
const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: "2%",
    padding: "15px!important",
    paddingTop: "20px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    boxShadow: "none"
  }
});

class Editor extends React.Component {
  render() {
    const { classes, config } = this.props;
    return (
      <React.Fragment>
        <DanteEditor
          content={config.content}
          onChange={config.onChange}
          readOnly={config.readOnly}
          bodyPlaceholder={config.bodyPlaceholder}
        />
        <Button
          color="primary"
          onClick={config.onSubmit}
          className={classes.button}
        >
          {config.buttonName}
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Editor);
