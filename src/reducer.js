import { combineReducers } from 'redux';

import authReducer from './Auth/reducer';
import myIdeasReducer from './MyIdeas/reducer';

export default combineReducers({
  auth: authReducer,
  myIdeas: myIdeasReducer,
});
