import App from './App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import EventsPage from './components/EventsPage';

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
  }
];