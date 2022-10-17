import React from 'react';
import { Link } from 'gatsby';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="settings">Settings</Link>
    </div>
  );
}

export default Dashboard;
