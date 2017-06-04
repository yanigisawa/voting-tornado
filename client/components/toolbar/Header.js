import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import Logo from './Logo.js';

const Header = ({ loading }) => (
  <nav>
    <Link to="/">Home</Link>
    {" | "}
    <Link to="/events">Events</Link>
    {" | "}
    <Link to="/about">About</Link>
  </nav>
);

Header.propTypes = {
  loading: PropTypes.bool
};

export default Header;
