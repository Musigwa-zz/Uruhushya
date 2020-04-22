import {
  LOCATION_FETCHING,
  SAVE_PROVINCES,
  SAVE_DISTRICTS,
  SAVE_SECTORS,
  FETCHING_FAILED,
} from './types';
import Http from '../../helpers/http';

export const getProvinces = () => async (dispatch, getState) => {
  try {
    const { provinces } = getState().locations;
    if (provinces.length === 0) {
      dispatch({ type: LOCATION_FETCHING });
      const { data: body, status } = await Http.get('provinces');
      if (status === 200) {
        dispatch({ type: SAVE_PROVINCES, payload: body });
      } else {
        dispatch({ type: FETCHING_FAILED });
      }
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
};

export const getDistricts = (provinceId) => async (dispatch, getState) => {
  try {
    const { districts } = getState().locations;
    const { provinceId: provId } = districts[0] || {};
    if (districts.length === 0 || provinceId !== provId) {
      dispatch({ type: LOCATION_FETCHING });
      const { data: body, status } = await Http.get(`provinces/${provinceId}`);
      if (status === 200) {
        dispatch({
          type: SAVE_DISTRICTS,
          payload: body.map((d) => ({ ...d, provinceId })),
        });
      } else {
        dispatch({ type: FETCHING_FAILED });
      }
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
};

export const getSectors = (districtId) => async (dispatch, getState) => {
  try {
    const { sectors } = getState().locations;
    const { districtId: distId } = sectors[0] || {};
    if (sectors.length === 0 || districtId !== distId) {
      dispatch({ type: LOCATION_FETCHING });
      const { data: body, status } = await Http.get(`districts/${districtId}`);
      if (status === 200) {
        dispatch({
          type: SAVE_SECTORS,
          payload: body.map((s) => ({ ...s, districtId })),
        });
      } else {
        dispatch({ type: FETCHING_FAILED });
      }
    }
  } catch (error) {
    dispatch({ type: FETCHING_FAILED });
  }
};
