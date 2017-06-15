import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import Logo from './Logo.js';
import Auth from '../auth/auth';

const auth = new Auth();

function login() {
  auth.login();
}

const Header = ({loading, isAuthenticated}) => {
  let loginOut = <Link to="/" onClick={login}>Login</Link>;
  if (isAuthenticated) {
    loginOut = <Link to="/logout" >Logout</Link>;
  }

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
        {loginOut}
      </nav>
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

export default Header;