import * as types from '../../actions/actionTypes';
import jquery from 'jquery';
import {apiUrl} from '../../api/api.config';

// const authorizationUrl = 'https://voting-tornado.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api';

class AuthApi {
  static validateJwt(jwt) {
    return jquery.ajax({
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + jwt
      },
      url: apiUrl + '/auth'
    });
  }

  static getUsers(jwt) {
    return jquery.ajax({
      method: 'GET',
      headers: {
        Authorization: 'Bearer: ' + jwt
      },
      url: apiUrl + '/auth'
    });
  }
}

export default AuthApi;