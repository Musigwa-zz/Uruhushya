import {
  FETCHING_FAILED,
  PASS_FETCHING,
  CACHE_PASS_DATA,
  SEND_REQ_SUCCESS,
  GET_REASONS,
  GET_TRANS_TYPES,
} from './types';
import Http from '../../helpers/http';
import { store } from '../store';
import moment from 'moment';
import { DropAlert } from '../../components/Alerts';

export const cacheRequest = (data) => async (dispatch) => {
  dispatch({ type: CACHE_PASS_DATA, payload: data });
};

export const submitRequest = ({
  goDate: depDate,
  come_date: returnDate,
  ...data
}) => async (dispatch) => {
  const {
    passData: { request } = {},
    userData: { user } = {},
  } = store.getState();
  const { name, nid_passport, sector = {}, location } = user;
  const fromLocation = sector.id || location;
  const goDate = moment(depDate).format('L');
  const goTime = moment(depDate).format('HH:mm');
  const come_date = moment(returnDate).format('L');
  const come_time = moment(returnDate).format('HH:mm');
  const reqBody = {
    ...request,
    ...data,
    fromLocation,
    nid: nid_passport,
    name,
    goDate,
    goTime,
    come_date,
    come_time,
  };
  let message = 'Gusaba uruhushya ntibyakozwe neza. Ongera ugerageze!';
  try {
    dispatch({ type: PASS_FETCHING, payload: reqBody });
    const { body, status } = await Http.post('permissions/request', reqBody);
    if (status === 200) {
      DropAlert(body.message, 'success');
      dispatch({ type: SEND_REQ_SUCCESS, payload: {} });
    } else {
      message = body.message && body.message;
      DropAlert(message, 'warn');
      dispatch({ type: FETCHING_FAILED });
    }
  } catch (error) {
    DropAlert(error.message || message, 'error');
  }
};

export const getReasons = () => async (dispatch) => {
  try {
    const { body, status } = await Http.get('reasons/all');
    if (status === 200) {
      dispatch({
        type: GET_REASONS,
        payload: body.map((r) => ({ id: r.id, name: r.reason })),
      });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
};

export const getTransports = () => async (dispatch) => {
  try {
    const { body, status } = await Http.get('transportTypes/all');
    if (status === 200) {
      dispatch({ type: GET_TRANS_TYPES, payload: body });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
};
