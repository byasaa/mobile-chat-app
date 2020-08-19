import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import friend from './friend';
import profile from './profile';
import location from './location';

export default combineReducers({
  auth,
  message,
  friend,
  profile,
  location,
});
