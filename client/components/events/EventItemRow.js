import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';

const EventItemRow = ({event}) => {
  return (
    <tr>
      <td><Link to={'/event/' + event.id}>{event.title}</Link></td>
      <td>{event.startDate}</td>
      <td>{event.endDate}</td>
    </tr>
  );
};

EventItemRow.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventItemRow;