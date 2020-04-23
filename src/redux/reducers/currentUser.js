import {
  USER_FETCHING,
  CURRENT_USER_FETCHED,
  REGISTER_SUCCESSFUL,
  FETCHING_FAILED,
  USER_NOT_FOUND,
  LOGIN_FLAG,
} from '../actions/types';

const initialState = {
  isFetching: false,
  user: {
    registered: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_FETCHING:
      return { ...state, isFetching: true };
    case FETCHING_FAILED:
      return { ...state, isFetching: false };
    case CURRENT_USER_FETCHED:
      return {
        ...state,
        user: { ...state.user, ...payload },
        isFetching: false,
      };
    case USER_NOT_FOUND:
      return {
        ...state,
        user: { ...state.user, phone: payload },
        isFetching: false,
      };
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        user: { ...state.user, ...payload },
        isFetching: false,
      };
    case FETCHING_FAILED:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
