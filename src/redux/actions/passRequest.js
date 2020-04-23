import moment from 'moment';
import { Alert } from 'react-native';
import {
  FETCHING_FAILED,
  PASS_FETCHING,
  CACHE_PASS_DATA,
  SEND_REQ_SUCCESS,
  GET_REASONS,
  GET_TRANS_TYPES,
} from './types';
import Http from '../../helpers/http';
import { DropAlert } from '../../components/Alerts';

export const cacheRequest = (data) => async (dispatch) => {
  dispatch({ type: CACHE_PASS_DATA, payload: data });
};

export const submitRequest = ({
  goDate: depDate,
  come_date: returnDate,
  ...data
}) => async (dispatch, getState) => {
  const { passData: { request } = {}, userData: { user } = {} } = getState();
  const { name, nid, sector = {}, phone, location } = user;
  const fromLocation = sector.id || location;
  const goDate = moment(depDate).format('D-MM-Y');
  const goTime = moment(depDate).format('HH:mm');
  const come_date = moment(returnDate).format('D-MM-Y');
  const come_time = moment(returnDate).format('HH:mm');
  let reqBody = { ...request, ...data, fromLocation, nid, phone };
  reqBody = { ...reqBody, name, goDate, goTime, come_date, come_time };
  let message = 'Gusaba uruhushya ntibyakozwe neza. Ongera ugerageze!';
  try {
    dispatch({ type: PASS_FETCHING, payload: reqBody });
    const { data: body } = await Http.post('permissions/request', reqBody);
    if (body.status === true) {
      let backHome = false;
      Alert.alert(
        body.message,
        "Ubusabe bwa bwakiriwe, burimo kwigwaho n'ababifite mu nshingano. Muraza kwakira ubutumwa bugufi burimo igisubizo mu gihe gitoya.\n\nUrashaka urundi ruhushya?",
        [
          { text: 'oya' },
          {},
          { text: 'yego', onPress: () => (backHome = true) },
        ],
      );
      dispatch({ type: SEND_REQ_SUCCESS, payload: { request: {}, backHome } });
    } else {
      message = body.message && body.message;
      DropAlert(message, 'warn');
      dispatch({ type: FETCHING_FAILED });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    DropAlert(error.message || message, 'error');
  }
};

export const getReasons = () => async (dispatch, getState) => {
  try {
    const { reasons } = getState().passData;
    if (reasons.length === 0) {
      const { data: body, status } = await Http.get('reasons/all');
      if (status === 200) {
        dispatch({
          type: GET_REASONS,
          payload: body.map((r) => ({ id: r.id, name: r.reason })),
        });
      }
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    DropAlert(error.message, 'error');
  }
};

export const getTransports = () => async (dispatch, getState) => {
  try {
    const { transportTypes } = getState().passData;
    const { data: body, status } = await Http.get('transportTypes/all');
    if (transportTypes.length === 0) {
      if (status === 200) {
        dispatch({ type: GET_TRANS_TYPES, payload: body });
      }
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
};
