import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import loading from './common/loading.svg';
import Auth from './auth/auth';
import {Redirect} from 'react-router-dom';

class Auth0CallbackPage extends Component {
  render() {
    let auth = new Auth();
    debugger;
    console.log(window.location.hash);
    console.log(this.props.location.hash);
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      auth.handleAuthentication();
    }

    return (
      <div>
        <h2>Logging you in...</h2>
        <img src={loading} alt="loading"/>
        <Redirect to={'/'} />
      </div>
    );
  }
}

Auth0CallbackPage.propTypes = {
  location: PropTypes.object
};

export default Auth0CallbackPage;