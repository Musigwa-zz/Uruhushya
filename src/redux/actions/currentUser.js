import {
  USER_FETCHING,
  CURRENT_USER_FETCHED,
  REGISTER_SUCCESSFUL,
  FETCHING_FAILED,
  USER_NOT_FOUND,
} from './types';
import Http from '../../helpers/http';
import { store } from '../store';
import { DropAlert } from '../../components/Alerts';

export const checkUser = (phone) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCHING });
    const { body } = await Http.post('users/get', { phone });
    if (body.status === true) {
      const { name, nid_passport: nid, location } = body.data;
      dispatch({
        type: CURRENT_USER_FETCHED,
        payload: { nid, phone, location, name, registered: true },
      });
    } else {
      dispatch({ type: USER_NOT_FOUND, payload: phone });
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
        payload: { registered: true, ...data, phone: data.phone || user.phone },
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
