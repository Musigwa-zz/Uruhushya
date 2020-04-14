import {
  USER_FETCHING,
  CURRENT_USER_FETCHED,
  REGISTER_SUCCESSFUL,
  FETCHING_FAILED,
} from './types';
import Http from '../../helpers/http';
import store from '../store';

export const checkUser = (phone) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCHING });
    const { body } = await Http.post('users/get', { phone });
    dispatch({
      type: CURRENT_USER_FETCHED,
      payload:
        body.status === true
          ? { ...body.data, registered: true }
          : { phone, registered: false },
    });
    console.log('the body is here:', body);
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    console.log('this is an error', error);
  }
};

export const registerUser = (data) => async (dispatch) => {
  try {
    const { userData: { user } = {} } = store.getState();
    dispatch({ type: USER_FETCHING });
    const { sector, district, province, ...rest } = data;
    const { body } = await Http.post('users/create', {
      ...rest,
      phone: data.phone || user.phone,
      location: sector.id,
    });
    console.log('the response:', body);
    if (body.status === true) {
      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: { registered: true, ...data },
      });
    } else {
      dispatch({ type: FETCHING_FAILED });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    console.log('this is an error');
  }
};
