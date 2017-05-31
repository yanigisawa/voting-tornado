import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import EventsPage from './components/EventsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="event" component={EventsPage} />
    {/*<Route path="course" component={ManageCoursePage} />    
    <Route path="course/:id" component={ManageCoursePage} />    */}
    <Route path="about" component={AboutPage} />    
  </Route>
);