import React from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, Redirect} from 'react-router-dom';
import * as voteActions from '../../actions/voteActions';
import toastr from 'toastr';
import {wsUrl} from '../../api/api.config';

class EventVotePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      teamVotes: props.teamVotes,
      event: props.event,
      saving: false,
      redirectToResults: false
    };

    this.rankClicked = this.rankClicked.bind(this);
    this.saveVote = this.saveVote.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getCompletedCount = this.getCompletedCount.bind(this);
  }

  componentDidMount() {
    this.ws = new WebSocket(wsUrl);
    this.ws.onerror = e => console.log(`WebSocket error`);
    this.ws.onclose = e => !e.wasClean && console.log(`error: WebSocket error: ${e.code} ${e.reason}`);
  }

  componentWillUnmount() {
    this.ws.close()
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.event.id !== nextProps.event.id) {
      this.setState({
        event: JSON.parse(JSON.stringify(nextProps.event)),
        teamVotes: JSON.parse(JSON.stringify(nextProps.teamVotes))
      });
    }
  }

  getTeamVoteById(teamVotes, teamId) {
    let team = teamVotes.find(v => v.teamId === teamId);
    if (!team) { return null; }

    return team;
  }

  rankClicked(e) {
    let vars = e.target.id.split('_');
    let teamId = vars[0];
    let categoryId = parseInt(vars[1]);
    let rank = parseInt(vars[2]);
    this.setState(function(prevState) {
      let team = prevState.teamVotes.filter(v => v.teamId === teamId);
      if (!team || !team.length) { return prevState; }
      team = team[0];
      let teamIndex = prevState.teamVotes.indexOf(team);
      let category = team.categories.filter(c => c.id === categoryId)[0];
      let categoryIndex = team.categories.indexOf(category);
      prevState.teamVotes[teamIndex].categories[categoryIndex].rank = rank;
      prevState.teamVotes[teamIndex].categoryVoteCount = this.calculateCompletedCount(prevState, teamId);
      return prevState;
    });
  }

  redirect() {
    this.setState({saving: false, redirectToResults: true});
    toastr.success('Vote Saved');
    this.render();
  }

  voteIsComplete() {
    let expectedVotes = this.state.event.categories.length * this.state.event.teams.length;
    let actualVotes = 0;
    this.state.teamVotes.map(tv => {
      tv.categories.map(c => {
        if (c.rank) { actualVotes++; }
      });
    });

    return actualVotes === expectedVotes;
  }

  saveVote() {
    if (!this.voteIsComplete()) {
      toastr.error('Please Vote on all teams in all categories to save your vote');
      return;
    }

    this.setState({saving: true});
    let vote = {
      eventId: this.state.event.id,
      // TODO: add user Id
      teamVotes: this.state.teamVotes
    };

    this.props.actions.saveVote(vote)
      .then(() => {
        this.redirect()
        this.ws.send(JSON.stringify(vote));
      },
        (xr, status, error) => {
        toastr.error("Save Failed: " + xr + " - " + status + " - " + error);
        this.setState({saving: false});
      });
  }

  calculateCompletedCount(state, teamId) {
    let total = this.props.event.categories.length;
    let teamVote = this.getTeamVoteById(state.teamVotes, teamId);
    if (!teamVote) { return "0 / " + total; }

    let completed = 0;
    teamVote.categories.map(c => {
      if (c.rank) { completed++; }
    });

    return completed + " / " + total;
  }

  getCompletedCount(teamId) {
    let teamVote = this.state.teamVotes.find(t => t.teamId === teamId);
    let total = this.props.event.categories.length;
    let initialCompletedCount = "0 / " + total;
    if (!teamVote) { return initialCompletedCount; }
    if (!teamVote.categoryVoteCount) { return initialCompletedCount;}

    return teamVote['categoryVoteCount'];
  }

  render() {
    return (
      <div className="col-md-8">
        {this.state.redirectToResults && <Redirect to={"/results/" + this.state.event.id} />}
        <h3>{this.props.event.title} - Voting</h3>
        <div className="panel-group" role="tablist" id="accordion">
        {this.props.event.teams && this.props.event.teams.map(t =>
          <div className="panel panel-default" key={t._id} >
            <div className="panel-heading" role="tab" id={"heading" + t._id}>
              <h4 className="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + t._id} aria-expanded="false" aria-controls={"collapse" + t._id}>
                  {t.name} <span className="pull-right badge">{this.getCompletedCount(t._id)}</span>
                </a>
              </h4>
            </div>
            <div id={"collapse" + t._id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading" + t._id} >
              <div className="panel-body">

                {this.props.event.categories && this.props.event.categories.map(c =>
                  <div key={c.id}>
                    <h4>{c.name}</h4>
                    <div className="btn-group" role="group" data-toggle="buttons">
                      <label className="btn btn-default" onClick={this.rankClicked} id={t._id + "_" + c.id + "_1"}>
                        <input type="radio" name={c.id + "vote"} value="1" autoComplete="off" />1
                      </label>
                      <label className="btn btn-default" onClick={this.rankClicked} id={t._id + "_" + c.id + "_2"}>
                        <input type="radio" name={c.id + "vote"} value="2" autoComplete="off"/>2
                      </label>
                      <label className="btn btn-default" onClick={this.rankClicked} id={t._id + "_" + c.id + "_3"}>
                        <input type="radio" name={c.id + "vote"} value="3" autoComplete="off"/>3
                      </label>
                      <label className="btn btn-default" onClick={this.rankClicked} id={t._id + "_" + c.id + "_4"}>
                        <input type="radio" name={c.id + "vote"} value="4" autoComplete="off"/>4
                      </label>
                      <label className="btn btn-default" onClick={this.rankClicked} id={t._id + "_" + c.id + "_5"}>
                        <input type="radio" name={c.id + "vote"} value="5" autoComplete="off"/>5
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
        <input className="btn btn-primary"
          disabled={this.state.saving}
          type="submit" value={this.state.saving ? "Saving..." : "Save"} onClick={this.saveVote} />
      </div>
    );
  }
}

EventVotePage.propTypes = {
    event: PropTypes.object.isRequired,
    teamVotes: PropTypes.array.isRequired,
    actions: PropTypes.object
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
  let votes = [];
  if (eventId && state.events.length) {
    event = getEventById(state.events, eventId);

    if (event.teams) {
      event.teams.map(t => {
        categories = [];
        event.categories.map(c => {
          categories.push({ id: c.id, weight: c.weight });
        });

        let vote = {
          teamId: t._id,
          categories: categories
        };
        votes.push(vote);
      });
    }

  }
  return {
    event: event,
    teamVotes: votes
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(voteActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventVotePage);