import {
  IS_FETCHING,
  SAVE_PROVINCES,
  SAVE_DISTRICTS,
  SAVE_SECTORS,
} from '../actions/types';

const initialState = {
  isFetching: false,
  provinces: [],
  districts: [],
  sectors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case IS_FETCHING:
      return { ...state, isFetching: true };
    case SAVE_PROVINCES:
      return { ...state, isFetching: false, provinces: payload };
    case SAVE_DISTRICTS:
      return { ...state, isFetching: false, districts: payload };
    case SAVE_SECTORS:
      return { ...state, isFetching: false, sectors: payload };
    default:
      return state;
  }
};
