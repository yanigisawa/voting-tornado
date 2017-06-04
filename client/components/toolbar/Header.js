import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import Logo from './Logo.js';
import Auth from '../auth/auth';

const auth = new Auth();

function login() {
  auth.login();
}

const Header = ({ loading }) => {
  return (
    <nav>
      <Link to="/" >Home</Link>
      {" | "}
      <Link to="/events" >Events</Link>
      {" | "}
      <Link to="/about" >About</Link>
      {" | "}
      {auth.isAuthenticated() && <Link to="/logout" >Logout</Link>}
      {!auth.isAuthenticated() && <Link to="/" onClick={login}>Login</Link>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool
};

export default Header;
