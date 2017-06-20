import {combineReducers} from 'redux';
import events from './eventReducer';
import votes from './voteReducer';
// import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import isAuthenticated from '../components/auth/authReducer';

const rootReducer = combineReducers({
  events, // short-hand property name ES6
  votes,
  isAuthenticated,
  ajaxCallsInProgress
});

export default rootReducer;