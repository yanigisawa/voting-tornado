import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import EventList from './EventList';
import * as eventActions from '../../actions/eventActions';

class EventsPage extends React.Component {
  render () {
    return (
      <div>
        <h1>Events</h1>
        <EventList events={this.props.events} />
      </div>
    );
  }
}

EventsPage.propTypes = {
  events : PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    courses : state.events
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (EventsPage);