import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {PropTypes} from 'prop-types';
import loading from './common/loading.svg';
import Auth from './auth/auth';

class Auth0CallbackPage extends Component {
  render() {
    let auth = new Auth();
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      auth.handleAuthentication();
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div>
        <h2>Logging you in...</h2>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

Auth0CallbackPage.propTypes = {
  location: PropTypes.object
};

export default Auth0CallbackPage;