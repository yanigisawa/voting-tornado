import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventReducer(state = initialState.events, action) {
  switch(action.type) {
    case types.LOAD_EVENTS_SUCCESS:
      return action.events;
    
    case types.CREATE_EVENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.event)
      ];

    case types.UPDATE_EVENT_SUCCESS:
      return [
        ...state.filter(event => event.id !== action.event.id),
        JSON.parse(JSON.stringify(action.event))
      ];
    default:
      return state;
  }
}