import { IS_FETCHING, CURRENT_USER_FETCHED } from '../actions/types';

const initialState = {
  isFetching: false,
  user: {
    registered: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case IS_FETCHING:
      return { ...state, isFetching: true };
    case CURRENT_USER_FETCHED:
      return { ...state, isFetching: false, user: payload };
    default:
      return state;
  }
};
