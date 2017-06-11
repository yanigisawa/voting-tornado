import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import EventForm from './EventForm';
import * as eventActions from '../../actions/eventActions';
import toastr from 'toastr';
import {Redirect} from 'react-router-dom';

class ManageEventPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      event: Object.assign({}, props.event),
      errors: {},
      saving: false,
      redirectToEvents: false
    };

    this.updateEvent = this.updateEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.redirect = this.redirect.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
  }

  getCategoryFieldFromField(field, categoryId) {
    let f = field.replace('category', '').replace(categoryId, '');
    return f.replace('Name', 'name').replace('Weight', 'weight');
  }

  getCategoryIdFromField(field) {
    let categoryId = field.replace('categoryName', '').replace('categoryWeight', '');
    return parseInt(categoryId);
  }

  updateEvent(e) {
    let field = e.target.name;
    let event = this.state.event;
    if (field.includes("category")) {
      let categoryId = this.getCategoryIdFromField(field);
      let categoryItem = event.categories.filter(c => c.id == categoryId)[0];
      field = this.getCategoryFieldFromField(field, categoryId);
      categoryItem[field] = e.target.value;
    } else {
      event[field] = e.target.value;
    }

    return this.setState({event: event});
  }

  redirect() {
    this.setState({saving: false, redirectToEvents: true});
    toastr.success('Event Saved');
    this.render();
  }

  saveEvent(e) {
    e.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveEvent(this.state.event)
      .then(() => this.redirect(), 
        (xr, status, error) => {
        toastr.error("Save Failed: " + xr + " - " + status + " - " + error);
        this.setState({saving: false});
      });
  }

  addNewCategory(e) {
    this.setState((prevState) => {
      let nextCategoryId = prevState.event.categories.length;
      prevState.event.categories.push({id: nextCategoryId, name: '', weight: 0.0});
    });
  }

  render () {
    console.log("redirect: " + this.state.redirectToEvents);
    return (
      <div>
        {this.state.redirectToEvents && <Redirect to="/events" />}
        <h1>Manage Event</h1>
        <EventForm
          event={this.state.event}
          errors={this.state.errors}
          categories={this.state.event.categories}
          onChange={this.updateEvent}
          onSave={this.saveEvent}
          saving={this.state.saving}
          onNewCategory={this.addNewCategory} />
      </div>
    );
  }
}

ManageEventPage.propTypes = {
  event : PropTypes.object.isRequired,
  categories: PropTypes.array,
  actions: PropTypes.object
};


function getEventById(events, eventId) {
  eventId = parseInt(eventId);
  const filteredEvents = events.filter(e => e.id === eventId);
  if (filteredEvents.length) { return filteredEvents[0]; }
  return {};
}

const mapStateToProps = (state, ownProps) => {
  // TODO: Passing URL param doesn't work
  const eventId = ownProps.match.params.id; // from /event/<id>
  let categories = [{id: 0, name: '', weight: 0.0}];
  let event = {id: '', title: '', startDate: '', endDate: '', categories: categories, teamMembers: []};
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