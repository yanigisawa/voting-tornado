import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import Auth, {Roles} from '../auth/auth';

const EventItemRow = ({event, allowEventEdit}) => {
  return (
    <tr>
      <td><Link to={'/viewevent/' + event.id}>{event.title}</Link></td>
      <td>{event.startDate}</td>
      <td>{event.endDate}</td>
      {allowEventEdit && <td><Link to={'/event/' + event.id}>Edit</Link></td>}
    </tr>
  );
};

EventItemRow.propTypes = {
  event: PropTypes.object.isRequired,
  allowEventEdit: PropTypes.bool.isRequired
};

export default EventItemRow;