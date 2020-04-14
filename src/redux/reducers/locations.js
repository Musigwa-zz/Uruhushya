import {
  LOCATION_FETCHING,
  SAVE_PROVINCES,
  SAVE_DISTRICTS,
  SAVE_SECTORS,
  FETCHING_FAILED,
} from '../actions/types';

const initialState = {
  isFetching: false,
  provinces: [],
  districts: [],
  sectors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOCATION_FETCHING:
      return { ...state, isFetching: true };
    case FETCHING_FAILED:
      return { ...state, isFetching: false };
    case SAVE_PROVINCES:
      return { ...state, provinces: payload, isFetching: false };
    case SAVE_DISTRICTS:
      return { ...state, districts: payload, isFetching: false };
    case SAVE_SECTORS:
      return { ...state, sectors: payload, isFetching: false };
    default:
      return state;
  }
};
