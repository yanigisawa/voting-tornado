import {combineReducers} from 'redux';
import events from './eventReducer';
// import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  events, // short-hand property name ES6
  // authors,
  ajaxCallsInProgress
});

export default rootReducer;