import React from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class ViewEventPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h3><label>Title</label> - {this.props.event.title}</h3>
        <h3><label>Start Date</label> - {this.props.event.startDate}</h3>
        <h3><label>End Date</label> - {this.props.event.endDate}</h3>
        {this.props.event.categories && this.props.event.categories.length &&
        <h3>Categories</h3>
        }
        {this.props.event.categories && this.props.event.categories.map(c =>
          <div key={c.id}>
            <dl className="dl-horizontal tornado">
              <dt>Name</dt>
              <dd>{c.name}</dd>
              <dt>Weight</dt>
              <dd>{c.weight}</dd>
            </dl>
          </div>
        )}
        <h3>Teams</h3>
        {
          this.props.event.teams && this.props.event.teams.map(t =>
            <div key={t._id}>
              <dl className="dl-horizontal tornado">
                <dt>Name</dt>
                <dd><b>{t.name}</b></dd>
                <dt>Description</dt>
                <dd>{t.description}</dd>
                <dt>Members</dt>
                <dd><ul>
                {t.members.map(m =>
                  <li key={m._user_id}>{m.email} {m.is_team_lead && <b>Leader</b>}</li>
                )}
              </ul></dd>
              </dl>
            </div>
          )
        }
      </div>
    );
  }
}

ViewEventPage.propTypes = {
  event: PropTypes.object.isRequired
};

function getEventById(events, eventId) {
  const filteredEvents = events.filter(e => e.id === eventId);
  if (filteredEvents.length) { return filteredEvents[0]; }
  return {};
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id; // from /event/<id>
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

export default connect(mapStateToProps)(ViewEventPage);