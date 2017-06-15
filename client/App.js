import React from 'react';
import {PropTypes} from 'prop-types';
import Header from './components/toolbar/Header';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {routes} from './routes';
import Auth from './components/auth/auth';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  // componentWillUpdateProps(prevProps, nextProps) {
  //   let auth = new Auth();
  //   return {
  //     loading: false,
  //     isAuthenticated: auth.isAuthenticated()
  //   };
  // }
  shouldComponentUpdate() {
    return true;
  }

  render () {
    return (
      <div className="container-fluid">
        <Router>
          <div>
            <Header loading={this.props.loading} isAuthenticated={this.props.isAuthenticated} /> 

            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log("App.js mapStateToProps: " + state.isAuthenticated);
  let auth = new Auth();
  return {
    loading: false,
    isAuthenticated: auth.isAuthenticated()
  };
}

export default connect(mapStateToProps)(App);
