import React from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

class EventVotePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h3>{this.props.event.title} - Voting</h3>
        <div className="list-group">
        {this.props.event.teams && this.props.event.teams.map(t =>
          <Link key={t._id} className="list-group-item" to={'/vote/' + this.props.event.id + '/team/' + t._id}>{t.name} - Vote</Link>
        )}
        </div>
      </div>
    );
  }
}

EventVotePage.propTypes = {
    event: PropTypes.object.isRequired
};

function getEventById(events, eventId) {
  const filteredEvents = events.filter(e => e.id === eventId);
  if (filteredEvents.length) { return filteredEvents[0]; }
  return {};
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id; // from /vote/<id>
  let categories = [{id: 0, name: '', weight: 0.0}];
  let event = {id: '', title: '', startDate: '', endDate: '', categories: categories, team: []};
  if (eventId && state.events.length) {
    event = getEventById(state.events, eventId);
  }
  return {
    event: event
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(mapStateToProps)(EventVotePage);