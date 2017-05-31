import {combineReducers} from 'redux';
// import courses from './courseReducer';
// import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  // courses, // short-hand property name ES6
  // authors,
  ajaxCallsInProgress
});

export default rootReducer;