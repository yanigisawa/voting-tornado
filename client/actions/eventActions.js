import * as types from './actionTypes.js';
import eventsApi from '../api/eventsApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadEventsSuccess(events) {
  return {type: types.LOAD_EVENTS_SUCCESS, events};
}

// export function updateCourseSuccess(course) {
//   return {type: types.UPDATE_COURSE_SUCCESS, course};
// }

// export function createCourseSuccess(course) {
//   return {type: types.CREATE_COURSE_SUCCESS, course};
// }

export function loadEvents() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return eventsApi.getAllEvents().done(response => {
      dispatch(loadEventsSuccess(response.events));
    }).fail(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

// export function saveCourse(course) {
//   return function(dispatch, getState) {
//     dispatch(beginAjaxCall());
//     return courseApi.saveCourse(course).then(savedCourse => {
//       course.id ? dispatch(updateCourseSuccess(savedCourse)) :
//         dispatch(createCourseSuccess(savedCourse));
//     }).catch(error => {
//       dispatch(ajaxCallError());
//       throw(error);
//     });
//   };
// }