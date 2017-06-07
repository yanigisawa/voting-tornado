import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import EventForm from './EventForm';
import * as eventActions from '../../actions/eventActions';

class ManageEventPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      event: Object.assign({}, props.event),
      errors: {},
      saving: false
    };
  }

  updateEvent(e) {

  }

  saveEvent(e) {

  }

  render () {
    return (
      <div>
        <h1>Manage Event</h1>
        <EventForm
          event={this.state.event}
          errors={this.state.errors}
          categories={this.state.categories}
          onChange={this.updateEvent}
          onSave={this.saveEvent}
          saving={this.state.saving}/>
      </div>
    );
  }
}

ManageEventPage.propTypes = {
  event : PropTypes.object.isRequired,
  categories: PropTypes.array
};


function getEventById(events, eventId) {
  const filteredEvents = events.filter(e => e.id === eventId);
  if (filteredEvents.length) { return filteredEvents[0]; }
  return {};
}

const mapStateToProps = (state, ownProps) => {
  debugger;
  const eventId = ownProps.match.params.id; // from /event/<id>
  let event = {id: '', title: '', startDate: '', endDate: '', categories: [], teamMembers: []};
  if (eventId && state.events.length) {
    event = getEventById(state.events, eventId);
  }

  return {
    event: event,
    categories: state.categories
  };
};


function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageEventPage);