import { EventEmitter } from 'events';
import createHistory from 'history/createBrowserHistory';
import auth0 from 'auth0-js';
import {AUTH_CONFIG} from './auth0.config';
import AuthApi from './authApi';

class Auth extends EventEmitter {
  constructor() {
    super();
    // this.history = createHistory();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);

    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: "https://voting-tornado.auth0.com/userinfo",
      responseType: 'token id_token',
      scope: 'openid'
    });
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        AuthApi.validateJwt(authResult.idToken).done((result => {
          this.setSession(authResult);
        })).fail((result) => {
          console.log("Failed to authenticate jwt: " + result);
        });
      }
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('roles', authResult.idTokenPayload['http://voting-tornado.com/roles']);
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('roles');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  isInRole(roleName) {
    const roles = localStorage.getItem('roles');
    return roles.includes(roleName);
  }

  getIdToken() {
    return localStorage.getItem('id_token');
  }
}

export default Auth;
export const Roles = {
  Admin: 'Admin',
  User: 'User'
};