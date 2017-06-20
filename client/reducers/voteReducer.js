import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function voteReducer(state = initialState.votes, action) {
  switch(action.type) {
    case types.SAVE_VOTE_SUCCESS:
      return [
        ...state,
        JSON.parse(JSON.stringify(action.vote))
      ];

    default:
      return state;
  }
}