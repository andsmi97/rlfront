import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BACKEND_URI } from "../../../constants.js";
import { connect } from "react-redux";
import { openSnack, openAlert } from "../../../actions";
//projectS actions
import { selectEditProject } from "../actions";
import { RENDER_DELETE_PROJECT } from "../constants";
const styles = {
  card: {
    marginBottom: 20
  },
  media: {
    objectFit: "cover"
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
    // marginBottom: 15,
    // marginLeft: 15
  },
  jcfe: {
    justifyContent: "flex-end"
  }
};

const mapStateToProps = state => {
  return {
    snackDelete: state.projectsReducer.snackDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openSnack: (type, message) => dispatch(openSnack(type, message)),
    openAlert: (message, alertFunction) =>
      dispatch(openAlert(message, alertFunction)),
    onUpdateProjectClick: id => dispatch(selectEditProject(id)),
    renderDeleteProject: project =>
      dispatch({ type: RENDER_DELETE_PROJECT, payload: project })
  };
};

class Project extends React.Component {
  deleteProject = () => {
    this.props.openAlert("Вы действительно хотите удалить проект?", () => {
      const token = window.localStorage.getItem("token");
      fetch(`${BACKEND_URI}/deleteproject`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          id: this.props.projectID
        })
      })
        .then(response => response.json())
        .then(response => this.props.renderDeleteProject(response))
        .then(() => this.props.openSnack("success", "Проект удален"));
    });
  };
  render() {
    const { classes, title, body, image, image1 } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="400"
              image={image}
              title="Contemplative Reptile"
            />
          )}
          {image1 && (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="400"
              image={image1}
              title="Contemplative Reptile"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              component="p"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.jcfe}>
          {/* <Button size="small" color="primary">
            Подробнее
          </Button> */}
          <Button
            size="small"
            color="primary"
            onClick={() =>
              this.props.onUpdateProjectClick(this.props.projectID)
            }
          >
            Редактировать
          </Button>
          <Button size="small" color="secondary" onClick={this.deleteProject}>
            Удалить
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Project.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Project));
