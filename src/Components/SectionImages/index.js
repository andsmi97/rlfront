import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SectionImage from "./SectionImage";
import { BACKEND_URI } from "../../constants";
import { requestSectionImages } from "./actions";
import { REORDER_SECTION, ADD_SECTION_IMAGE } from "./constants";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 400
});

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(3),
    minWidth: 0,
    overflowY: "scroll", // So the Typography noWrap works
    marginTop: 60,
    paddingLeft: 20
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  item: {
    maxWidth: "100%"
  }
});

const mapStateToProps = state => ({ ...state.sectionImagesReducer });
const mapDispatchToProps = dispatch => {
  return {
    onRequestSectionsImages: () => dispatch(requestSectionImages()),
    reorderSection: (section, order) =>
      dispatch({ type: REORDER_SECTION, payload: { section, order } }),
    addSectionImage: (section, item) =>
      dispatch({ type: ADD_SECTION_IMAGE, payload: { section, item } })
  };
};
class SectionImages extends React.Component {
  onDragEnd = (result, section) => {
    const token = window.localStorage.getItem("token");
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newOrder = reorder(
      this.props[section],
      result.source.index,
      result.destination.index
    );
    this.props.reorderSection(section, newOrder);
    fetch(`${BACKEND_URI}/reorderPhotos`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        site: "ozerodom.ru",
        section: section,
        photos: newOrder.map(item => item.content)
      })
    })
      .then(response => response.json())
      .catch(() => console.log("Возникла ошибка изменения порядка"));
  };

  addPhoto = (event, section) => {
    const token = window.localStorage.getItem("token");
    let formData = new FormData();
    formData.append(`file`, event.target.files[0]);
    formData.append("site", "ozerodom.ru");
    formData.append("section", section);
    fetch(`${BACKEND_URI}/addimg`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(response =>
        this.props.addSectionImage(section, {
          ...response,
          id: Math.max(...this.props[section].map(item => item.id)) + 1
        })
      );
  };

  componentDidMount() {
    this.props.onRequestSectionsImages();
  }

  render() {
    let { classes, carousel, genPlan, gallery, path } = this.props;
    let carouselPhotos = carousel.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <SectionImage key={item.id} item={item} />
          </div>
        )}
      </Draggable>
    ));

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          ref={0}
        >
          <Typography variant="h5" gutterBottom>
            Фотографии слайдера
          </Typography>
          <DragDropContext
            onDragEnd={result => this.onDragEnd(result, "carousel")}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {carouselPhotos}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="addCarouselPhoto"
            multiple
            type="file"
            onChange={event => this.addPhoto(event, "carousel")}
          />
          <label htmlFor="addCarouselPhoto">
            <Button aria-label="Add" component="span">
              Добавить
            </Button>
          </label>

          <Typography variant="h5" gutterBottom>
            Фотографии Генерального плана
          </Typography>
          <DragDropContext
            onDragEnd={result => this.onDragEnd(result, "genPlan")}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {genPlan.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <SectionImage item={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="addGenPlanPhoto"
            multiple
            type="file"
            onChange={event => this.addPhoto(event, "genPlan")}
          />
          <label htmlFor="addGenPlanPhoto">
            <Button aria-label="Add" component="span">
              Добавить
            </Button>
          </label>

          <Typography variant="h5" gutterBottom>
            Фотогаллерея
          </Typography>
          <DragDropContext
            onDragEnd={result => this.onDragEnd(result, "gallery")}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {gallery.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <SectionImage item={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="addGalleryPhoto"
            multiple
            type="file"
            onChange={event => this.addPhoto(event, "gallery")}
          />
          <label htmlFor="addGalleryPhoto">
            <Button aria-label="Add" component="span">
              Добавить
            </Button>
          </label>
          <Typography variant="h5" gutterBottom>
            Фотографии проезда
          </Typography>
          <DragDropContext onDragEnd={result => this.onDragEnd(result, "path")}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {path.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <SectionImage item={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SectionImages));
