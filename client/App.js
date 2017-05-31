import React, {PropTypes} from 'react';
import PurpleAppBar from './components/toolbar/PurpleAppBar.js';      // AppBar with simple overrides
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import {connect} from 'react-redux';

class App extends React.Component {
  render () {
    return (
      <div>
          <PurpleAppBar />
          {this.props.children}
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    
  };
}

export default connect(mapStateToProps)(App);
