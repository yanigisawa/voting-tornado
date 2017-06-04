import React from 'react';
import Auth from './auth/auth';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.launchAuth0 = this.launchAuth0.bind(this);
    this.auth = new Auth();
  }

  launchAuth0(e) {
    this.auth.login();
  }

  render () {
    return (
    <div className="jumbotron">
        <h1>Home page</h1>
        <input type="submit" value="Launch Auth0" className="btn btn-primary" onClick={this.launchAuth0} />
    </div>
    );
  }
}

export default HomePage;