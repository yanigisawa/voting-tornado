import React from 'react';
import {PropTypes} from 'prop-types';
import EventItemRow from './EventItemRow';

const EventList = ({events}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => 
            <EventItemRow key={event.id.toString()} event={event} />
          )}
        </tbody>
      </table>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventList;
