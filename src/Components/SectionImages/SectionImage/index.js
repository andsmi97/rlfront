import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { BACKEND_URI } from "../../../constants.js";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { requestSectionImages } from "../actions";
import { openSnack, openAlert } from "../../../actions";
import { RENDER_DELETE_PHOTO, RENDER_UPDATE_PHOTO } from "../constants";
const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    minWidth: 0,
    overflowY: "scroll", // So the Typography noWrap works
    marginTop: 60,
    paddingLeft: 20
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  card: {
    maxWidth: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
  }
});

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestSectionsImages: () => dispatch(requestSectionImages()),
    renderDeletePhoto: response =>
      dispatch({ type: RENDER_DELETE_PHOTO, payload: response }),
    renderUpdatePhoto: response =>
      dispatch({
        type: RENDER_UPDATE_PHOTO,
        payload: response
      }),
    openSnack: (type, message) => dispatch(openSnack(type, message)),
    openAlert: (message, alertFunction) =>
      dispatch(openAlert(message, alertFunction))
  };
};

class SectionImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      image: this.props.item.content,
      section: this.props.item.section
    };
  }
  //TODO CHANGE DELETE
  deletePhoto = () => {
    this.props.openAlert("Действительно удалить фотографию?", () => {
      const token = window.localStorage.getItem("token");
      fetch(`${BACKEND_URI}/deletePhoto`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          site: "ozerodom.ru",
          section: this.props.item.section,
          photo: this.props.item.content
        })
      })
        .then(response => response.json())
        .then(() =>
          this.props.renderDeletePhoto({
            section: this.props.item.section,
            image: this.props.item.content
          })
        )
        .then(() => this.props.openSnack("success", "Фото удалено"));
    });
  };

  updatePhoto = event => {
    const token = window.localStorage.getItem("token");
    let formData = new FormData();
    formData.append(`file`, event.target.files[0]);
    formData.append("site", "ozerodom.ru");
    formData.append("section", this.state.section);
    formData.append("oldPhoto", this.state.image);
    fetch(`${BACKEND_URI}/updatePhoto`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token
      }
    }).then(() => this.props.onRequestSectionsImages());
  };

  onFileChange = event => {
    let file = event.target.files[0];
    this.setState({
      file
    });
  };
  render() {
    const { classes, item } = this.props;

    return (
      <Card className={classes.card}>
        <CardActions className={classes.actions} disableActionSpacing>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id={`${item.section}-${item.id}`}
            multiple
            type="file"
            onChange={this.updatePhoto}
          />
          <label htmlFor={`${item.section}-${item.id}`}>
            <IconButton aria-label="Edit" component="span">
              <EditIcon />
            </IconButton>
          </label>
          <IconButton aria-label="Delete" onClick={this.deletePhoto}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardMedia
          className={classes.media}
          image={item.content}
          title="Лесная гавань"
        />
      </Card>
    );
  }
}

SectionImage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SectionImage));
