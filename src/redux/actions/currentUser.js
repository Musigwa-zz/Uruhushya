import { IS_FETCHING, CURRENT_USER_FETCHED } from './types';
import Http from '../../helpers/http';

export const checkUser = (phone) => async (dispatch) => {
  try {
    dispatch({ type: IS_FETCHING });
    const response = await Http.post('users/get', { phone });
    const { body } = response;
    if (body.status === true) {
      dispatch({
        type: CURRENT_USER_FETCHED,
        payload: { ...body.data, registered: true },
      });
    } else {
      dispatch({
        type: CURRENT_USER_FETCHED,
        payload: { phone, registered: false },
      });
    }
  } catch (error) {
    console.log('this is an error', error);
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: IS_FETCHING });
    console.log('these are user info:', user);
  } catch (error) {
    console.log('this is an error');
  }
};
