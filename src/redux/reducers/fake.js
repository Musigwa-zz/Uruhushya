import { IS_FETCHING } from '../actions/types';

const initialState = {
  isFetching: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case IS_FETCHING:
      return { ...state, isFetching: true };

    default:
      return state;
  }
};
