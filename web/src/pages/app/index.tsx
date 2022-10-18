import React from 'react';
import { Link } from 'gatsby';
import { Router, RouteComponentProps } from '@reach/router';
import Dashboard from 'src/components/Dashboard';

const DashboardPage = (props: RouteComponentProps) => <Dashboard />;
const SettingsPage = (props: RouteComponentProps) => (
  <div>
    <h1>Settings</h1>
    <Link to="/app">Dashboard</Link>
  </div>
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
