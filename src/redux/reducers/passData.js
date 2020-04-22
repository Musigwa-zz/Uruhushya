import {
  CACHE_PASS_DATA,
  PASS_FETCHING,
  SEND_REQ_SUCCESS,
  FETCHING_FAILED,
  GET_REASONS,
  GET_TRANS_TYPES,
} from '../actions/types';

const initialState = {
  isFetching: false,
  request: {},
  transportTypes: [],
  reasons: [],
};

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case CACHE_PASS_DATA:
      return { ...state, request: payload, isFetching: false };
    case PASS_FETCHING:
      return { ...state, request: payload, isFetching: true };
    case SEND_REQ_SUCCESS:
      return { ...state, request: payload, isFetching: false };
    case GET_REASONS:
      return { ...state, reasons: payload, isFetching: false };
    case GET_TRANS_TYPES:
      return { ...state, transportTypes: payload, isFetching: false };
    case FETCHING_FAILED:
      return { ...state, ...payload, isFetching: false };
    default:
      return state;
  }
};
