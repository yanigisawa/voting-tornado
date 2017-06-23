import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Auth from './auth/auth';
import {Redirect} from 'react-router-dom';
import * as authActions from './auth/authActions';

class LogoutPage extends React.Component {
  constructor(props, context) {
    super(props, context);
       this.auth = new Auth();
  }

  componentWillMount() {
    this.auth.logout();
    // this.props.dispatch(authActions.logout());
  }

  render() {
    return (
      <div>
        <h2>You have been logged out.</h2>
        <Redirect to="/" />
      </div>
    );
  }
}

LogoutPage.propTypes = {
  actions: PropTypes.object
};

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(authActions, dispatch)
//   };
// }

export default connect(() => {return {};}) (LogoutPage);