import authReducer from './Auth/reducer';
import myIdeasReducer from './MyIdeas/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  myIdeas: myIdeasReducer,
});
