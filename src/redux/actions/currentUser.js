import {
  USER_FETCHING,
  CURRENT_USER_FETCHED,
  REGISTER_SUCCESSFUL,
  FETCHING_FAILED,
} from './types';
import Http from '../../helpers/http';
import { store } from '../store';
import { DropAlert } from '../../components/Alerts';

export const checkUser = (phone) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCHING });
    const { body } = await Http.post('users/get', { phone });
    if (body.status === true) {
      dispatch({
        type: CURRENT_USER_FETCHED,
        payload: { ...body.data, registered: true },
      });
    } else {
      dispatch({ type: CURRENT_USER_FETCHED, payload: { phone } });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
};

export const registerUser = (data) => async (dispatch) => {
  let message = 'Kwiyandikisha ntibigenze neza. Ongera ugerageze!';
  try {
    const { userData: { user } = {} } = store.getState();
    dispatch({ type: USER_FETCHING });
    const { sector, district, province, ...rest } = data;
    const { body } = await Http.post('users/create', {
      ...rest,
      phone: data.phone || user.phone,
      location: sector.id,
    });
    if (body.status === true) {
      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: { registered: true, ...data },
      });
    } else {
      DropAlert(body.message || message, 'warn');
      dispatch({ type: FETCHING_FAILED });
    }
  } catch (error) {
    DropAlert(error.message || message, 'error');
    dispatch({ type: FETCHING_FAILED });
  }
};
