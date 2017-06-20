import React from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class ResultsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h2>Show Results Here</h2>
      </div>
    );
  }
}

ResultsPage.propTypes = {
  // myProp: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    // state: state
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(mapStateToProps)(ResultsPage);
