import authReducer from './Auth/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer
});
