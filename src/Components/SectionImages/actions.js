import {
  REQUEST_SECTION_IMAGES_PENDING,
  REQUEST_SECTION_IMAGES_SUCCESS,
  REQUEST_SECTION_IMAGES_FAILED
} from "./constants";
import { BACKEND_URI } from "../../constants";

export const requestSectionImages = () => dispatch => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_SECTION_IMAGES_PENDING });
  fetch(`${BACKEND_URI}/siteContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
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
};
