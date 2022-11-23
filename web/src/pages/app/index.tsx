import React, { FC } from 'react';
import { navigate } from 'gatsby';
import { Router, RouteComponentProps } from '@reach/router';
import Dashboard from 'src/components/Dashboard';
import Settings from 'src/components/Settings';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { isLoggedIn, parseAuth } from 'src/services/auth';

const DashboardPage: FC<RouteComponentProps> = () => (
  <ProtectedRoute condition={isLoggedIn} navigate={navigate}>
    <Dashboard />
  </ProtectedRoute>
);

const SettingsPage: FC<RouteComponentProps> = () => (
  <ProtectedRoute condition={isLoggedIn} navigate={navigate}>
    <Settings />
  </ProtectedRoute>
);

function App() {
  parseAuth();

  return (
    <Router basepath="/app">
      <DashboardPage path="/"></DashboardPage>
      <SettingsPage path="settings"></SettingsPage>
    </Router>
  );
}

export default App;
