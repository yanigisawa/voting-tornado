import React from 'react';
import {PropTypes} from 'prop-types';
import EventItemRow from './EventItemRow';

const EventList = ({events, allowEventEdit, allowEventVoting}) => {

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            {allowEventVoting && <th>Vote</th>}
            <th>Start Date</th>
            <th>End Date</th>
            {allowEventEdit && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {events && events.map(event =>
            <EventItemRow key={event.id.toString()} event={event} allowEventEdit={allowEventEdit} allowEventVoting={allowEventVoting} />
          )}
        </tbody>
      </table>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  allowEventEdit: PropTypes.bool.isRequired,
  allowEventVoting: PropTypes.bool.isRequired
};

export default EventList;
