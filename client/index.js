import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {loadEvents} from './actions/eventActions';
// import {loadAuthors} from './actions/authorActions';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import configureStore from './components/configureStore';
import {Provider} from 'react-redux';
import '../node_modules/toastr/build/toastr.min.css';
import initialState from './reducers/initialState';

const store = configureStore(initialState);
store.dispatch(loadEvents());
// store.dispatch(loadAuthors());

render (
  <Provider store={store}>
    <App loading={false} />
  </Provider>,
  document.getElementById('app')
);
