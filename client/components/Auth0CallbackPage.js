import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import loading from './common/loading.svg';
import Auth from './auth/auth';
import * as eventActions from '../actions/eventActions';
import * as authActions from './auth/authActions';

class Auth0CallbackPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.auth = new Auth();
  }

  componentWillMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.auth.handleAuthentication();
      // this.setState({isAuthenticated: true});
      this.props.dispatch(authActions.authorizeJwt());
      eventActions.loadEvents();
    }
  }

  render() {
    //Warning: setState(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.
    if (this.auth.isAuthenticated()) {
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
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool
  // actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let auth = new Auth();
  return {
    // location: ownProps.location,
    // isAuthenticated: auth.isAuthenticated()
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(authActions, dispatch)
//   };
// }

export default connect(() => {return {};}) (Auth0CallbackPage);