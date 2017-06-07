import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import EventList from './EventList';
import * as eventActions from '../../actions/eventActions';
import {Redirect} from 'react-router-dom';

class EventsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      addEventRedirect: false
    }

    this.redirectToAddEventPage = this.redirectToAddEventPage.bind(this);
  }

  redirectToAddEventPage() {
    this.setState({addEventRedirect: true});
  }

  render () {
    return (
      <div>
        {this.state.addEventRedirect && <Redirect to="/event/" />}
        <h1>Events</h1>
        <input type="submit"
          value="Add Event"
          className="btn btn-primary"
          onClick={this.redirectToAddEventPage} />
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
    events : state.events
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (EventsPage);