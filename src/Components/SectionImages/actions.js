import {
  REQUEST_SECTION_IMAGES_PENDING,
  REQUEST_SECTION_IMAGES_SUCCESS,
  REQUEST_SECTION_IMAGES_FAILED
} from "./constants";
import { BACKEND_URI } from "../../constants";

export const requestSectionImages = () => dispatch => {
  dispatch({ type: REQUEST_SECTION_IMAGES_PENDING });
  fetch(`${BACKEND_URI}/siteContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      site: "ozerodom.ru"
    })
  })
    .then(response => response.json())
    .then(data =>
      dispatch({ type: REQUEST_SECTION_IMAGES_SUCCESS, payload: data })
    )
    .catch(error =>
      dispatch({ type: REQUEST_SECTION_IMAGES_FAILED, payload: error })
    );

  // .then(response => {
  //   this.setState({
  //     carousel: response.carousel.map((image, index) => {
  //       return { id: `item-${index}`, content: image, section: "carousel" };
  //     }),
  //     advertising: response.advertising.map((image, index) => {
  //       return {
  //         id: `item-${index}`,
  //         content: image,
  //         section: "advertising"
  //       };
  //     }),
  //     genPlan: response.genPlan.map((image, index) => {
  //       return { id: `item-${index}`, content: image, section: "genPlan" };
  //     }),
  //     gallery: response.gallery.map((image, index) => {
  //       return { id: `item-${index}`, content: image, section: "gallery" };
  //     }),
  //     path: response.path.map((image, index) => {
  //       return { id: `item-${index}`, content: image, section: "path" };
  //     })
  //   });
  // })
};
