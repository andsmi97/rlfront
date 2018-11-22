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
import {
  openInsertSuccessPopUp,
  openUpdateSuccessPopUp,
  openDeleteSuccessPopUp,
  closeInsertSuccessPopUp,
  closeUpdateSuccessPopUp,
  closeDeleteSuccessPopUp
} from "./actions";
const styles = {
  card: {
    marginBottom: 20
  },
  media: {
    objectFit: "cover"
  }
};

const mapStateToProps = state => {
  return {

    snackInsert: state.postReducer.snackInsert,
    snackUpdate: state.postReducer.snackUpdate,
    snackDelete: state.postReducer.snackDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInsertionSuccess: () => dispatch(openInsertSuccessPopUp()),
    onUpdateSuccess: () => dispatch(openUpdateSuccessPopUp()),
    onDeleteSuccess: () => dispatch(openDeleteSuccessPopUp()),
    onInsertionSuccessClose: () => dispatch(closeInsertSuccessPopUp()),
    onUpdateSuccessClose: () => dispatch(closeUpdateSuccessPopUp()),
    onDeleteSuccessClose: () => dispatch(closeDeleteSuccessPopUp())
  };
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state ={id:this.props.id}
  }
  deletePost = () => {
    // console.log(this.props.postID)
    fetch(`${BACKEND_URI}/deletepost`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.postID
      })
    })
      .then(response => console.log(response))
      .then(() => this.props.onDeleteSuccess());
      // .then(() => this.props.onResetTenantDeleteFields());
  };
  render() {
    const { classes, title, body } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="140"
            image="https://sun9-3.userapi.com/c635101/v635101442/2eb65/bByG-f1YjUU.jpg"
            title="Contemplative Reptile"
          />
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
        <CardActions className="jcfe">
          <Button size="small" color="primary">
            Подробнее
          </Button>
          <Button size="small" color="primary">
            Редактировать
          </Button>
          <Button size="small" color="secondary" onClick={this.deletePost}>
            Удалить
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post));
