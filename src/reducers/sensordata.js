import {
  CHANGE_SENSOR_STATE,
  SENSORSDATA_LOADED,
  SENSORSDATA_UNLOADED,
  TARIFFS_LOADED,
  SENSORS_CLEAR,
  LAST_BILL_DATE_LOADED,
  SET_INITIAL_VALUES,
  SET_SENSORS_ERRORS,
  SET_PREVIOUS_DATA
} from "../constants/actionTypes";
const initialState = {
  houses: [],
  dayTariff: 0,
  nightTariff: 0,
  lastBillDate: null,
  errors: []
};

const clearSensorsState = state => {
  const newState = { ...state };
  Object.keys(state).forEach(key => {
    if (
      (key.includes("day") || key.includes("night")) &&
      !key.includes("Tariff")
    ) {
      newState[key] = "";
    }
  });
  return newState;
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SENSOR_STATE:
      return { ...state, [action.key]: action.value };
    case SET_INITIAL_VALUES:
    case SENSORSDATA_LOADED:
      return { ...state, houses: action.payload };
    case LAST_BILL_DATE_LOADED:
      if (action.payload.lastBillDate) {
        return {
          ...state,
          lastBillDate: new Date(action.payload.lastBillDate)
        };
      }
      return { ...state };
    case SENSORS_CLEAR:
      return clearSensorsState(state);
    case SET_PREVIOUS_DATA:
      return {
        ...state,
        lastBillDate: action.lastBillDate,
        houses: action.houses
      };
    case TARIFFS_LOADED:
      return {
        ...state,
        dayTariff: action.payload ? action.payload.day : 0,
        nightTariff: action.payload ? action.payload.night : 0
      };
    case SET_SENSORS_ERRORS:
      return { ...state, errors: action.payload };
    case SENSORSDATA_UNLOADED:
      return initialState;
    default:
      return state;
  }
};
