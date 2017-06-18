import * as types from '../../actions/actionTypes';
import authApi from './authApi';
import {beginAjaxCall, ajaxCallError} from '../../actions/ajaxStatusActions';
import Auth from './auth';

export function loginSuccess() {
  return {type: types.LOGIN_SUCCESS };
}

export function logoutSuccess() {
  return {type: types.LOGOUT_SUCCESS };
}

const auth = new Auth();

export function authorizeJwt() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return authApi.validateJwt(auth.getIdToken()).done(response => {
      dispatch(loginSuccess(auth.isAuthenticated()));
    }).fail(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function logout() {
  return function(dispatch) {
    dispatch(logoutSuccess(auth.isAuthenticated()));
  };
}
