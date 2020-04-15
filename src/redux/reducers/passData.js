import {
  CACHE_PASS_DATA,
  PASS_FETCHING,
  SEND_REQ_SUCCESS,
  FETCHING_FAILED,
} from '../actions/types';

const initialState = {
  isFetching: false,
  request: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CACHE_PASS_DATA:
      return { ...state, request: payload };
    case PASS_FETCHING:
      return { ...state, request: payload };
    case SEND_REQ_SUCCESS:
      return { ...state, request: payload };
    case FETCHING_FAILED:
      return { ...state, request: payload, isFetching: false };
    default:
      return state;
  }
};
