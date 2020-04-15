import {
  FETCHING_FAILED,
  PASS_FETCHING,
  CACHE_PASS_DATA,
  SEND_REQ_SUCCESS,
} from './types';
import Http from '../../helpers/http';
import { store } from '../store';

export const cacheRequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: CACHE_PASS_DATA, payload: data });
    // const data = await Http.get('provinces');
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    // console.log('this is an error', error);
  }
};

export const submitRequest = (data) => async (dispatch) => {
  const {
    passData: { request } = {},
    userData: { user } = {},
  } = store.getState();
  const { name, nid, sector = {}, location } = user;
  const fromLocation = sector.id || location;
  const reqBody = { ...request, ...data, fromLocation, nid, name };
  try {
    dispatch({ type: PASS_FETCHING, payload: { ...request, ...data } });
    const { body } = await Http.post('permissions/request', reqBody);
    if (body.status === true) {
      dispatch({ type: SEND_REQ_SUCCESS, payload: reqBody });
    } else {
      dispatch({ type: FETCHING_FAILED });
      console.log('this is an error');
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    console.log('this is an error', error);
  }
};
