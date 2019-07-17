import {
  CHANGE_SENSOR_STATE,
  SENSORSDATA_LOADED,
  SENSORSDATA_UNLOADED,
  TARIFFS_LOADED,
  SENSORS_CLEAR
} from "../constants/actionTypes";
const initialState = {
  houses: [],
  dayTariff: 0,
  nightTariff: 0
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
    case SENSORSDATA_LOADED:
      return { ...state, houses: action.payload };
    case SENSORS_CLEAR:
      return clearSensorsState(state);
    case TARIFFS_LOADED:
      return {
        ...state,
        dayTariff: action.payload.day,
        nightTariff: action.payload.night
      };
    case SENSORSDATA_UNLOADED:
      return initialState;
    default:
      return state;
  }
};
