import * as types from './actionTypes.js';
import votesApi from '../api/votesApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function saveVoteSuccess(vote) {
  return {type: types.SAVE_VOTE_SUCCESS, vote};
}

export function saveVote(vote) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());

    return votesApi.saveVote(vote).then(response => {
      if (response.success) {
        dispatch(saveVoteSuccess(response.vote));
        return;
      }
      console.log('Save Vote Failed: ' + response);
    }, (xr, status, error) => {
      dispatch(ajaxCallError());
    });
  }
}