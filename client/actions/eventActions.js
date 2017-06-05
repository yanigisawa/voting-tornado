import * as types from './actionTypes.js';
import eventsApi from '../api/eventsApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadEventsSucess(courses) {
  return {type: types.LOAD_EVENTS_SUCCESS, courses};
}

// export function updateCourseSuccess(course) {
//   return {type: types.UPDATE_COURSE_SUCCESS, course};
// }

// export function createCourseSuccess(course) {
//   return {type: types.CREATE_COURSE_SUCCESS, course};
// }

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return eventsApi.getAllEvents().then(events => {
      dispatch(loadEventsSucess(events));
    }).catch(error => {
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