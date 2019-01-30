import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setTitleField,
  setBodyField,
  requestProjects,
  openInsertProjectWindow,
  closeInsertProjectWindow,
  openEditProjectWindow,
  closeEditProjectWindow,
  setEditTitleField,
  setEditBodyField,
  resetInsertProjectFields,
  resetUpdateProjectFields
} from "./actions";
import { openSnack } from "../../actions";
import {
  RENDER_NEW_PROJECT,
  RENDER_UPDATE_PROJECT,
  SET_PREVIEW_IMAGE_2,
  SET_PREVIEW_IMAGE_1,
  SET_UPLOAD_FILE_1,
  SET_UPLOAD_FILE_2
} from "./constants";
import ReactQuill from "react-quill";
import { BACKEND_URI } from "../../constants";
import Project from "./Project";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 3,
    minWidth: 0,
    overflowY: "scroll",
    marginTop: 40
  },
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
  },
  img: {
    objectFit: "cover"
  }
});

const mapStateToProps = state => {
  return {
    titleField: state.projectsReducer.titleField,
    bodyField: state.projectsReducer.bodyField,
    loadedProjects: state.projectsReducer.loadedProjects,
    insertWindowOpened: state.projectsReducer.insertWindowOpened,
    editWindowOpended: state.projectsReducer.editWindowOpended,
    editTitleField: state.projectsReducer.editTitleField,
    editBodyField: state.projectsReducer.editBodyField,
    editProjectID: state.projectsReducer.editProjectID,
    editImage1: state.projectsReducer.editImage1,
    editImage2: state.projectsReducer.editImage2,
    editFile2: state.projectsReducer.editFile2,
    editFile1: state.projectsReducer.editFile1,
    previewEditImage1: state.projectsReducer.previewEditImage1,
    previewEditImage2: state.projectsReducer.previewEditImage2
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestProjects: () => dispatch(requestProjects()),
    onTitleChange: event => dispatch(setTitleField(event.target.value)),
    onEditTitleChange: event => dispatch(setEditTitleField(event.target.value)),
    onBodyChange: value => dispatch(setBodyField(value)),
    onEditBodyChange: value => dispatch(setEditBodyField(value)),
    onOpenInsertProjectWindow: () => dispatch(openInsertProjectWindow()),
    onCloseInsertProjectWindow: () => dispatch(closeInsertProjectWindow()),
    onOpenEditProjectWindow: () => dispatch(openEditProjectWindow()),
    onCloseEditProjectWindow: () => dispatch(closeEditProjectWindow()),
    onSuccess: (type, message) => dispatch(openSnack(type, message)),
    onResetInsertProjectFields: () => dispatch(resetInsertProjectFields()),
    onResetUpdateProjectFields: () => dispatch(resetUpdateProjectFields()),
    renderNewProject: project =>
      dispatch({ type: RENDER_NEW_PROJECT, payload: project }),
    renderUpdateProject: project =>
      dispatch({
        type: RENDER_UPDATE_PROJECT,
        payload: project
      }),
    setPreviewImage2: e =>
      dispatch({
        type: SET_PREVIEW_IMAGE_2,
        payload: e.target.result
      }),
    setPreviewImage1: e =>
      dispatch({
        type: SET_PREVIEW_IMAGE_1,
        payload: e.target.result
      }),
    setUploadFile1: e =>
      dispatch({
        type: SET_UPLOAD_FILE_1,
        payload: e.target.files[0]
      }),
    setUploadFile2: e =>
      dispatch({
        type: SET_UPLOAD_FILE_2,
        payload: e.target.files[0]
      })
  };
};
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "EmailSender",
      previewImage1: "",
      previewImage2: "",
      insertFile1: {},
      insertFile2: {},
      previewEditImage1: "",
      previewEditImage2: "",
      editFile: {},
      edit2File: {}
    };
    // this.onChangeInsertFile1 = this.onChangeInsertFile1.bind(this);
    // this.onChangeInsertFile2 = this.onChangeInsertFile2.bind(this);
  }

  onSubmitProject = () => {
    const token = window.localStorage.getItem("token");
    let form = new FormData();
    form.append("file1", this.state.insertFile1);
    form.append("file2", this.state.insertFile2);
    form.append("title", this.props.titleField);
    form.append("body", this.props.bodyField);
    form.append("site", "ozerodom.ru");
    fetch(`${BACKEND_URI}/addproject`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(response => this.props.renderNewProject(response))
      .then(() => this.props.onSuccess("success","Проект добавлен"))
      .then(() => this.props.onResetInsertProjectFields())
      .then(() => this.setState({ previewImage1: "", previewImage2: "" }));
  };

  onSubmitUpdateProject = () => {
    const token = window.localStorage.getItem("token");
    let form = new FormData();
    form.append("file1", this.props.editFile1);
    form.append("file2", this.props.editFile2);
    form.append("image1", this.props.editImage1);
    form.append("image2", this.props.editImage2);
    form.append("title", this.props.editTitleField);
    form.append("body", this.props.editBodyField);
    form.append("site", "ozerodom.ru");
    form.append("id", this.props.editProjectID);
    fetch(`${BACKEND_URI}/updateproject`, {
      method: "PATCH",
      body: form,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(response => this.props.renderUpdateProject(response))
      .then(() => this.props.onSuccess("success","Проект обновлен"))
      .then(() => this.props.onResetUpdateProjectFields())
      .catch(error => console.log(error));
  };

  scrollToMyRef = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  };
  componentDidMount() {
    this.props.onRequestProjects();
  }

  modules = {
    toolbar: [
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "video"],
      ["clean"]
    ]
  };

  formats = [
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "video"
  ];

  onChangeInsertFile1 = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      this.setState({
        insertFile1: e.target.files[0]
      });
      reader.onload = ev => {
        this.setState({
          previewImage1: ev.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  onChangeInsertFile2 = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      this.setState({
        insertFile2: e.target.files[0]
      });
      reader.onload = ev => {
        this.setState({
          previewImage2: ev.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onChangeUpdateFile1 = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      this.props.setUploadFile1(e);
      reader.onload = ev => {
        this.props.setPreviewImage1(ev);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  onChangeUpdateFile2 = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      this.props.setUploadFile2(e);
      reader.onload = ev => {
        this.props.setPreviewImage2(ev);
      };
      reader.readAsDataURL(e.target.files[0]);
      this.setState(this.state);
    }
  };

  render() {
    const {
      classes,
      onTitleChange,
      onBodyChange,
      bodyField,
      onEditBodyChange,
      onEditTitleChange,
      editTitleField,
      subjectField,
      insertWindowOpened,
      editWindowOpended,
      editImage1,
      editImage2,
      previewEditImage1,
      previewEditImage2
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          ref={0}
        >
          <Grid item xs={8}>
            {insertWindowOpened && (
              <Paper className={classes.paper}>
                <TextField
                  id="insert-title-field"
                  label="Название проекта"
                  value={subjectField}
                  margin="dense"
                  variant="filled"
                  onChange={onTitleChange}
                />
                <Input type="file" onChange={this.onChangeInsertFile1} />
                {this.state.previewImage1 && (
                  <img
                    src={this.state.previewImage1}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                )}
                <Input type="file" onChange={this.onChangeInsertFile2} />
                {this.state.previewImage2 && (
                  <img
                    src={this.state.previewImage2}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                )}

                <ReactQuill
                  modules={this.modules}
                  formats={this.formats}
                  value={bodyField}
                  onChange={onBodyChange}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.onSubmitProject}
                >
                  Добавить проект
                </Button>
              </Paper>
            )}
            {editWindowOpended && (
              <Paper className={classes.paper}>
                <TextField
                  id="edit-title-field"
                  label="Название проекта"
                  value={editTitleField}
                  margin="dense"
                  variant="filled"
                  onChange={onEditTitleChange}
                />
                <Input type="file" onChange={this.onChangeUpdateFile1} />
                {previewEditImage1 ? (
                  <img
                    src={previewEditImage1}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                ) : (
                  <img
                    src={editImage1}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                )}

                <Input type="file" onChange={this.onChangeUpdateFile2} />
                {previewEditImage2 ? (
                  <img
                    src={previewEditImage2}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                ) : (
                  <img
                    src={editImage2}
                    alt="upload"
                    width="100%"
                    height="400"
                    className={classes.img}
                  />
                )}
                <ReactQuill
                  modules={this.modules}
                  formats={this.formats}
                  value={this.props.editBodyField}
                  onChange={onEditBodyChange}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.onSubmitUpdateProject}
                >
                  Обновить проект
                </Button>
              </Paper>
            )}
            <Paper className={classes.paper}>
              {this.props.loadedProjects.map(project => {
                return (
                  <Project
                    title={project.title}
                    body={project.body}
                    projectID={project._id}
                    image={project.image1}
                    image1={project.image2}
                    key={project._id}
                  />
                );
              })}
            </Paper>
          </Grid>
        </Grid>
        {this.props.insertWindowOpened &&
          !this.props.editWindowOpended && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={this.props.onCloseInsertProjectWindow}
            >
              <CloseIcon />
            </Button>
          )}
        {!this.props.insertWindowOpened &&
          this.props.editWindowOpended && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={this.props.onCloseEditProjectWindow}
            >
              <CloseIcon />
            </Button>
          )}
        {!this.props.insertWindowOpened &&
          !this.props.editWindowOpended && (
            <Button
              variant="fab"
              className={classes.fab}
              color="primary"
              onClick={() => {
                this.props.onOpenInsertProjectWindow();
              }}
            >
              <AddIcon />
            </Button>
          )}
      </main>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Projects));
