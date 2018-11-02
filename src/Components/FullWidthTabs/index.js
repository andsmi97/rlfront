import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className="rightbuttons">
        <AppBar position="static" color="default">
          <Tabs
            className="right-buttons"
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Добавить" />
            <Tab label="Изменить" />
            <Tab label="Удалить" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <TextField id="standard-dense" label="ФИО" margin="dense" />
            <TextField id="standard-dense" label="№Дома" margin="dense" />
            <TextField id="standard-dense" label="Email" margin="dense" />
            <Button color="primary" className={classes.button}>
              Добавить жильца
            </Button>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TextField id="standard-dense" label="ФИО" margin="dense" />
            <TextField id="standard-dense" label="Email" margin="dense" />
            <Button color="primary" className={classes.button}>
              Изменить жильца
            </Button>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TextField id="standard-dense" label="№Дома" margin="dense" />
            <Button color="secondary" className={classes.button}>
              Удалить жильца
            </Button>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
