import React from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {wsUrl} from '../../api/api.config';

class ResultsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      results : []
    };
  }

  componentDidMount() {
    this.ws = new WebSocket(wsUrl);
    this.ws.onmessage = e => {
      let result = JSON.parse(e.data);
      this.addResult(result);
      console.log(result);
    };
    this.ws.onerror = e => console.log(`WebSocket error`);
    this.ws.onclose = e => !e.wasClean && console.log(`error: WebSocket error: ${e.code} ${e.reason}`);
  }

  componentWillUnmount() {
    this.ws.close();
  }

  addResult(result) {
    this.setState(function(prevState) {
      prevState.results.push(result);
      return prevState;
    });
    this.render();
  }

  render() {
    return (
      <div>
        <h2>Show Results Here</h2>
        <p>Result Count: {this.state.results.length}</p>
        <ul className="list-unstyled">
          {this.state.results.map((result) => {
            <li> {result.eventId} </li>;
          })}
        </ul>
      </div>
    );
  }
}

ResultsPage.propTypes = {
  // results: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    // results : [ {eventId: 'someOtherEvent'} ]
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(mapStateToProps)(ResultsPage);
