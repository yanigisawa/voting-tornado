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
    <div>
      <h1>Voting Tornado</h1>
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
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool
};

export default Header;
