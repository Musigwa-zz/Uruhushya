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

export const cacheRequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: CACHE_PASS_DATA, payload: data });
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
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
  const { name, nid, sector = {}, location } = user;
  const fromLocation = sector.id || location;
  const goDate = moment(depDate).format('L');
  const goTime = moment(depDate).format('HH:mm');
  const come_date = moment(returnDate).format('L');
  const come_time = moment(returnDate).format('HH:mm');
  const reqBody = {
    ...request,
    ...data,
    fromLocation,
    nid,
    name,
    goDate,
    goTime,
    come_date,
    come_time,
  };

  try {
    dispatch({
      type: PASS_FETCHING,
      payload: reqBody,
    });
    const { body } = await Http.post('permissions/request', reqBody);
    if (body.status === true) {
      dispatch({ type: SEND_REQ_SUCCESS, payload: body });
    } else {
      dispatch({ type: FETCHING_FAILED });
      console.log('this is an error');
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    console.log('this is an error', error);
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
    console.log('this is an error', error);
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
    console.log('this is an error', error);
  }
};
