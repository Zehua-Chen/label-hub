import React from 'react';
import { navigate } from 'gatsby';
import { Router, RouteComponentProps } from '@reach/router';
import Dashboard from 'src/components/Dashboard';
import Settings from 'src/components/Settings';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { isLoggedIn } from 'src/services/auth';

const DashboardPage = (props: RouteComponentProps) => (
  <ProtectedRoute condition={isLoggedIn} navigate={navigate}>
    <Dashboard />
  </ProtectedRoute>
);

const SettingsPage = (props: RouteComponentProps) => (
  <ProtectedRoute condition={isLoggedIn} navigate={navigate}>
    <Settings />
  </ProtectedRoute>
);

function App() {
  return (
    <Router basepath="/app">
      <DashboardPage path="/"></DashboardPage>
      <SettingsPage path="settings"></SettingsPage>
    </Router>
  );
}

export default App;
