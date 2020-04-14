import {
  LOCATION_FETCHING,
  SAVE_PROVINCES,
  SAVE_DISTRICTS,
  SAVE_SECTORS,
  FETCHING_FAILED,
} from './types';
import Http from '../../helpers/http';

export const getProvinces = () => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_FETCHING });
    const data = await Http.get('provinces');
    if (data.status === 200) {
      dispatch({ type: SAVE_PROVINCES, payload: data.body });
    } else {
      dispatch({ type: FETCHING_FAILED });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    console.log('this is an error', error);
  }
};

export const getDistricts = (provinceId) => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_FETCHING });
    const data = await Http.get(`provinces/${provinceId}`);
    if (data.status === 200) {
      dispatch({
        type: SAVE_DISTRICTS,
        payload: data.body.map((d) => ({ ...d, provinceId })),
      });
    } else {
      dispatch({ type: FETCHING_FAILED });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    console.log('this is an error', error);
  }
};

export const getSectors = (districtId) => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_FETCHING });
    const data = await Http.get(`districts/${districtId}`);
    if (data.status === 200) {
      dispatch({
        type: SAVE_SECTORS,
        payload: data.body.map((s) => ({ ...s, districtId })),
      });
    } else {
      dispatch({ type: FETCHING_FAILED });
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
    console.log('this is an error', error);
  }
};
