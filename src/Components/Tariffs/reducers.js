import {
  CHANGE_UPDATE_TARIFFS_FIELD,
  RESET_TARIFFS_FIELDS,
  REQUEST_TARIFFS_SUCCESS,
  REQUEST_TARIFFS_FAILED,
  REQUEST_TARIFFS_PENDING
} from "./constants";

const initialStateTariffsFields = {
  tariffField: "",
  isPending: false,
  error: ""
};

export const tariffsReducer = (
  state = initialStateTariffsFields,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_TARIFFS_PENDING:
      return { ...state, isPending: true };
    case REQUEST_TARIFFS_SUCCESS:
      return {
        ...state,
        tariffField: action.payload[0].tariffs.gas,
        isPending: false
      };
    case REQUEST_TARIFFS_FAILED:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case CHANGE_UPDATE_TARIFFS_FIELD:
      return { ...state, tariffField: action.payload };
    case RESET_TARIFFS_FIELDS:
          return { ...state, tariffField: "" };
    default:
      return state;
  }
};
