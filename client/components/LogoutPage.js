import React from 'react';
import Auth from './auth/auth';

class LogoutPage extends React.Component {
	render() {
    let auth = new Auth();
    auth.logout();

		return (
			<div>
				<h2>You have been logged out.</h2>
			</div>
		);
	}
}

export default LogoutPage;