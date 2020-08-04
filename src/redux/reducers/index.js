import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import friend from './friend';
import profile from './profile';

export default combineReducers({
  auth,
  message,
  friend,
  profile,
});
