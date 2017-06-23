import React from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import jquery from 'jquery';


class TeamVotePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: props.categories
    };

    this.saveVote = this.saveVote.bind(this);
  }

  saveVote() {
    for (let i = 0; i < this.props.categories.length; i++) {
      let radio = jquery('[name=' + i + 'vote]:checked');
      console.log(radio.val());
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.team.name} - Voting</h3>
        <div className="list-group">
          {this.props.categories && this.props.categories.map(c =>
            <div key={c.id}>
              <h4>{c.name}</h4>
              <div className="btn-group" role="group" data-toggle="buttons">
                <label className="btn btn-default">
                  <input type="radio" name={c.id + "vote"} value="1" autoComplete="off" />1
                </label>
                <label className="btn btn-default">
                  <input type="radio" name={c.id + "vote"} value="2" autoComplete="off" />2
                </label>
                <label className="btn btn-default">
                  <input type="radio" name={c.id + "vote"} value="3" autoComplete="off" />3
                </label>
                <label className="btn btn-default">
                  <input type="radio" name={c.id + "vote"} value="4" autoComplete="off" />4
                </label>
                <label className="btn btn-default">
                  <input type="radio" name={c.id + "vote"} value="5" autoComplete="off" />5
                </label>
              </div>
            </div>
          )}
          <br/>
          <input className="btn btn-primary" type="submit" value="Save" onClick={this.saveVote} />
        </div>
      </div>
    );
  }
}

TeamVotePage.propTypes = {
  categories: PropTypes.array.isRequired,
  eventId: PropTypes.string.isRequired,
  team: PropTypes.object.isRequired
};

function getEventById(events, eventId) {
  const filteredEvents = events.filter(e => e.id === eventId);
  if (filteredEvents.length) { return filteredEvents[0]; }
  return {};
}

function getInitialEvent() {
  let categories = [{id: 0, name: '', weight: 0.0}];
  let teams = [{id: 0, description: '', members: []}];
  return {id: '', title: '', startDate: '', endDate: '', categories: categories, teams: teams};
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.event_id; // from /vote/<event_id>/team/<team_id>
  const teamId = ownProps.match.params.team_id; // from /vote/<event_id>/team/<team_id>
  let event = getInitialEvent();
  let team = event.teams[0];
  if (eventId && state.events.length) {
    event = getEventById(state.events, eventId);
    team = event.teams.filter(t => t._id === teamId)[0];
  }

  return {
    team: team,
    categories: event.categories,
    eventId: eventId
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(mapStateToProps)(TeamVotePage);