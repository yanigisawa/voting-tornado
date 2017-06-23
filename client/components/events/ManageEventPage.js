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
      event: JSON.parse(JSON.stringify(props.event)),
      errors: {},
      saving: false,
      redirectToEvents: false
    };

    this.updateEvent = this.updateEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.redirect = this.redirect.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.event.id !== nextProps.event.id) {
      // Use JSON.parse and JSON.stringify for Deep Object Copy
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      this.setState({event: JSON.parse(JSON.stringify(nextProps.event))});
    }
  }

  getCategoryFieldFromField(field, categoryId) {
    let f = field.replace('category', '').replace(categoryId, '');
    return f.replace('Name', 'name').replace('Weight', 'weight');
  }

  getCategoryIdFromField(field) {
    let categoryId = field.replace('categoryName', '').replace('categoryWeight', '').replace('categoryRemove', '');
    return parseInt(categoryId);
  }

  updateEvent(e) {
    let field = e.target.name;
    let value = e.target.value;
    // Functional setState: https://medium.freecodecamp.com/functional-setstate-is-the-future-of-react-374f30401b6b
    let updateField = function(prevState) {
      let event = prevState.event;
      if (field.includes("category")) {
        let categoryId = this.getCategoryIdFromField(field);
        let categoryItem = event.categories.filter(c => c.id === categoryId)[0];
        let catIndex = event.categories.indexOf(categoryItem);
        field = this.getCategoryFieldFromField(field, categoryId);
        event.categories[catIndex][field] = value;
      } else {
        event[field] = value;
      }
      return event;
    };

    return this.setState(updateField);
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
      .then((response) => {
        debugger;
        this.redirect();
      },
        (xr, status, error) => {
        toastr.error("Save Failed: " + xr + " - " + status + " - " + error);
        this.setState({saving: false});
      });
  }

  addNewCategory(e) {
    this.setState((prevState) => {
      const categoryCount = prevState.event.categories.length;
      let nextCategoryId = 0;
      if (categoryCount > 0) {
        nextCategoryId = prevState.event.categories[categoryCount - 1].id + 1;
      }

      prevState.event.categories.push({id: nextCategoryId, name: '', weight: 0.0});
      return prevState.event;
    });
  }

  removeCategory(e) {
    let field = e.target.name;
    let event = this.state.event;

    if (!field.includes("category")) { return; }

    let categoryId = this.getCategoryIdFromField(field);
    event.categories = event.categories.filter(c => c.id !== categoryId);

    return this.setState({event: event});
  }

  render () {
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
          onNewCategory={this.addNewCategory}
          removeCategory={this.removeCategory} />
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
  const filteredEvents = events.filter(e => e.id === eventId);
  if (filteredEvents.length) { return filteredEvents[0]; }
  return {};
}

const mapStateToProps = (state, ownProps) => {
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