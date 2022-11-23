import React, { FC } from 'react';
import { navigate } from 'gatsby';
import { Router, RouteComponentProps, Link } from '@reach/router';
import ProducerDashboard from 'src/components/ProducerDashboard';
import ConsumerDashboard from 'src/components/ConsumerDashboard';
import Settings from 'src/components/Settings';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { isLoggedIn, AuthContext, getAuth } from 'src/services/auth';

function protectedRouteCondition(): () => boolean {
  return process.env.AUTH_ENABLED === 'true' ? isLoggedIn : () => true;
}

function makePage(
  children: JSX.Element,
  displayName: string
): FC<RouteComponentProps> {
  function Page() {
    return (
      <ProtectedRoute condition={protectedRouteCondition()} navigate={navigate}>
        {children}
      </ProtectedRoute>
    );
  }

  Page.displayName = displayName;

  return Page;
}

const ProducerDashboardPage = makePage(
  <ProducerDashboard />,
  'ProducerDashboardPage'
);

const ConsumerDashboardPage = makePage(
  <ConsumerDashboard />,
  'ConsumerDashboardPage'
);

const SettingsPage = makePage(<Settings />, 'SettingsPage');

const AppPage = makePage(
  <ul>
    <li>
      <Link to="producer">Producer</Link>
    </li>
    <li>
      <Link to="consumer">Consumer</Link>
    </li>
  </ul>,
  'AppPage'
);

function App() {
  return (
    <AuthContext.Provider value={getAuth()}>
      <Router basepath="/app">
        <AppPage path="/"></AppPage>
        <ProducerDashboardPage path="/producer"></ProducerDashboardPage>
        <ConsumerDashboardPage path="/consumer"></ConsumerDashboardPage>
        <SettingsPage path="settings"></SettingsPage>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
