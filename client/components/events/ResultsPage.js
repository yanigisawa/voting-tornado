import React from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {wsUrl} from '../../api/api.config';

class ResultsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.ws = new WebSocket(wsUrl);
    this.ws.onmessage = e => console.log(JSON.parse(e.data));
    let foo = "bar";
    console.log(`Foo - ${foo}`);
    this.ws.onerror = e => console.log(`WebSocket error`);
    this.ws.onclose = e => !e.wasClean && console.log(`error: WebSocket error: ${e.code} ${e.reason}`);
  }

  componentWillUnmount() {
    this.ws.close()
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
