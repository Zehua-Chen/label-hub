import React, { FC } from 'react';
import { navigate } from 'gatsby';
import { Router, RouteComponentProps, Link } from '@reach/router';
import ProducerDashboard from 'src/components/ProducerDashboard';
import ConsumerDashboard from 'src/components/ConsumerDashboard';
import Settings from 'src/components/Settings';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { isLoggedIn, parseAuth } from 'src/services/auth';

function protectedRouteCondition(): () => boolean {
  return process.env.AUTH_ENABLED === 'true' ? isLoggedIn : () => true;
}

function makePage(children: JSX.Element): FC<RouteComponentProps> {
  return () => (
    <ProtectedRoute condition={protectedRouteCondition()} navigate={navigate}>
      {children}
    </ProtectedRoute>
  );
}

const ProducerDashboardPage = makePage(<ProducerDashboard />);
const ConsumerDashboardPage = makePage(<ConsumerDashboard />);
const SettingsPage = makePage(<Settings />);

const AppPage = makePage(
  <ul>
    <li>
      <Link to="producer">Producer</Link>
    </li>
    <li>
      <Link to="consumer">Consumer</Link>
    </li>
  </ul>
);

function App() {
  parseAuth();

  return (
    <Router basepath="/app">
      <AppPage path="/"></AppPage>
      <ProducerDashboardPage path="/producer"></ProducerDashboardPage>
      <ConsumerDashboardPage path="/consumer"></ConsumerDashboardPage>
      <SettingsPage path="settings"></SettingsPage>
    </Router>
  );
}

export default App;
