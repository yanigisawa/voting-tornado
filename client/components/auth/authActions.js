import * as types from '../../actions/actionTypes';
import authApi from './authApi';
import {beginAjaxCall, ajaxCallError} from '../../actions/ajaxStatusActions';
import Auth from './auth';

export function loginSuccess() {
  console.log("from login success");
  return {type: types.LOGIN_SUCCESS };
}

export function logoutSuccess() {
  console.log("from logout success");
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
