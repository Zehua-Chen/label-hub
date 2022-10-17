import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import Dashboard from '../../components/Dashboard';

const DashboardPage = (props: RouteComponentProps) => <Dashboard />;
const SettingsPage = (props: RouteComponentProps) => <div>Settings</div>;

function App() {
  return (
    <Router basepath="/app">
      <DashboardPage path="/"></DashboardPage>
      <SettingsPage path="settings"></SettingsPage>
    </Router>
  );
}

export default App;
