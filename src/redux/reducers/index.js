import { combineReducers } from 'redux';
import locations from './locations';
import userData from './currentUser';
import passData from './passData';

export default combineReducers({ locations, userData, passData });
