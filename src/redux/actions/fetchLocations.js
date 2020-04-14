import {
  IS_FETCHING,
  SAVE_PROVINCES,
  SAVE_DISTRICTS,
  SAVE_SECTORS,
} from './types';

const request = async (endpoint = '', service = 'location') => {
  const baseUrl = service === 'location' ? 'http://197.243.52.214/api' : '';
  return await fetch(`${baseUrl}/${endpoint}`).then(async (res) => ({
    status: res.status,
    body: await res.json(),
  }));
};

export const getProvinces = () => async (dispatch) => {
  try {
    dispatch({ type: IS_FETCHING });
    const data = await request('provinces');
    if (data.status === 200) {
      dispatch({ type: SAVE_PROVINCES, payload: data.body });
    }
  } catch (error) {
    console.log('this is an error');
  }
};

export const getDistricts = (provinceId) => async (dispatch) => {
  try {
    dispatch({ type: IS_FETCHING });
    const data = await request(`provinces/${provinceId}`);
    if (data.status === 200) {
      dispatch({
        type: SAVE_DISTRICTS,
        payload: data.body.map((d) => ({ ...d, provinceId })),
      });
    }
  } catch (error) {
    console.log('this is an error');
  }
};

export const getSectors = (districtId) => async (dispatch) => {
  try {
    dispatch({ type: IS_FETCHING });
    const data = await request(`districts/${districtId}`);
    if (data.status === 200) {
      dispatch({
        type: SAVE_SECTORS,
        payload: data.body.map((s) => ({ ...s, districtId })),
      });
    }
  } catch (error) {
    console.log('this is an error');
  }
};
