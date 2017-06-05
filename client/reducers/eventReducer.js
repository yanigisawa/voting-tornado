import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventReducer(state = initialState.events, action) {
  switch(action.type) {
    case types.LOAD_EVENTS_SUCCESS:
      return action.eventss;
    
    // case types.CREATE_COURSE_SUCCESS:
    //   return [
    //     ...state,
    //     Object.assign({}, action.course)
    //   ];

    // case types.UPDATE_COURSE_SUCCESS:
    //   return [
    //     ...state.filter(course => course.id !== action.course.id),
    //     Object.assign({}, action.course)
      // ];
    default:
      return state;
  }
}