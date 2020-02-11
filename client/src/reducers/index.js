import { combineReducers } from 'redux';
import alert from './alert';
import user from './user';
import profile from './profile';
import feedback from './feedback';
import post from './post';
import analysis from './analysis';
import exam from './exam';
import fee from './duefee';

export default combineReducers({
  alert,
  user,
  profile,
  feedback,
  post,
  analysis,
  exam,
  fee
});
