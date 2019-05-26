import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import classNames from "classnames";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  success: {
    backgroundColor: green[600],
    flexDirection: "row!important"
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    flexDirection: "row!important"
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
    flexDirection: "row!important"
  },
  warning: {
    backgroundColor: amber[700],
    flexDirection: "row!important"
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class Snack extends React.Component {
  render() {
    const {
      classes,
      className,
      message,
      onClose,
      variant,
      open,
      ...other
    } = this.props;
    let Icon;
    //Workaround type warrning
    if (variant) {
      Icon = variantIcon[variant];
    } else {
      Icon = variantIcon["success"];
    }
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={onClose}
          ContentProps={{ "aria-describedby": "message-id" }}
        >
          <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={classes.icon} />
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
            {...other}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(Snack);
