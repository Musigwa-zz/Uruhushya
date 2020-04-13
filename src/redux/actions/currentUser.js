import { IS_FETCHING } from './types';

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: IS_FETCHING });
    console.log('these are user info:', user);
  } catch (error) {
    console.log('this is an error');
  }
};
