import React from 'react';
import {PropTypes} from 'prop-types';
import Header from './components/toolbar/Header';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {routes} from './routes';

class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <Router>
          <div>
            <Header loading={this.props.loading} /> 
            
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
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    
  };
}

export default connect(mapStateToProps)(App);
