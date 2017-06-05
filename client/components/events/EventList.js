import React from 'react';
import {PropTypes} from 'prop-types';
import EventItemRow from './EventItemRow';

const EventList = ({events}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => 
          <EventItemRow key={event.id} event={event} />
        )}
      </tbody>
    </table>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventList;
