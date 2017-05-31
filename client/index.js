import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
// import {loadCourses} from './actions/courseActions';
// import {loadAuthors} from './actions/authorActions';
// import './styles/styles.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './components/configureStore';
import {Provider} from 'react-redux';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
// store.dispatch(loadCourses());
// store.dispatch(loadAuthors());
const foo = "some foo string";

render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
