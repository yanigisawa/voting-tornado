import App from './App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import EventsPage from './components/events/EventsPage';
import Auth0CallbackPage from './components/Auth0CallbackPage';
import LogoutPage from './components/LogoutPage';

export const routes = [
  { path: '/',
    exact: true,
    main: HomePage
  },
  { path: '/about',
    main: AboutPage
  },
  { path: '/events',
    main: EventsPage
  },
  {
    path: '/auth0-callback',
    main: Auth0CallbackPage
  },
  {
    path: '/logout',
    main: LogoutPage
  }
];