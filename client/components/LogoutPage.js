import React from 'react';
import Auth from './auth/auth';
import {Redirect} from 'react-router';

class LogoutPage extends React.Component {
	render() {
    let auth = new Auth();
    auth.logout();

		return (
			<div>
				<h2>You have been logged out.</h2>
				<Redirect to="/" />
			</div>
		);
	}
}

export default LogoutPage;