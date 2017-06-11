import * as types from './actionTypes.js';
import eventsApi from '../api/eventsApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadEventsSuccess(events) {
  return {type: types.LOAD_EVENTS_SUCCESS, events};
}

export function updateEventSuccess(event) {
  return {type: types.UPDATE_EVENT_SUCCESS, event};
}

export function createEventSuccess(event) {
  return {type: types.CREATE_EVENT_SUCCESS, event};
}

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

export function saveEvent(event) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());

    let apiMethod = event.id ? eventsApi.updateEvent : eventsApi.createEvent;
    return apiMethod(event).then(response => {
      console.log("saved Event: " + response.success);
      if (event.id) {
         dispatch(updateEventSuccess(response.event));
      } else {
        dispatch(createEventSuccess(response.event));
      }
    }, (xr, status, error) => {
      dispatch(ajaxCallError());
      console.log("failed method called: " + error);
      // debugger;
      // throw(error);
    });
  };
}