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
        <h1>Home Page</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum non erat at bibendum. Nullam fermentum, nibh eget tempus ultricies, risus tellus luctus nisl, quis gravida risus turpis at justo. Nullam risus orci, placerat vitae quam vel, malesuada pulvinar risus. Mauris consequat, velit at pellentesque malesuada, ante ex molestie mi, sed facilisis ante enim eu nisi. Donec et justo eget tortor dignissim rhoncus. Nam hendrerit ligula sit amet purus accumsan cursus. Vivamus lobortis quam at gravida euismod. Ut ac lorem finibus, mattis enim eget, cursus nulla. Nulla justo enim, hendrerit sit amet felis elementum, pretium maximus leo. Donec quis magna ac diam tincidunt bibendum. Mauris eu leo vitae lectus porta fermentum.
        </p>
    </div>
    );
  }
}

export default HomePage;