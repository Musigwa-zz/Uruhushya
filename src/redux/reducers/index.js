import { combineReducers } from 'redux';
import locations from './locations';
import userData from './currentUser';

export default combineReducers({ locations, userData });
