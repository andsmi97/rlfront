//Tariffs
import {
  CHANGE_UPDATE_TARIFFS_FIELD,
  RESET_TARIFFS_FIELDS,
  REQUEST_TARIFFS_PENDING,
  REQUEST_TARIFFS_SUCCESS,
  REQUEST_TARIFFS_FAILED
} from "./constants";
import { BACKEND_URI } from "../../constants"
export const requestTariffs = () => dispatch => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_TARIFFS_PENDING });
  fetch(`${BACKEND_URI}/users`, {
    method: "get",
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TARIFFS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TARIFFS_FAILED, payload: error }));
};

export const setUpdateTariffs = text => ({
  type: CHANGE_UPDATE_TARIFFS_FIELD,
  payload: text
});

export const resetTariffsField = () => ({
  type: RESET_TARIFFS_FIELDS,
  payload: ""
});
