import React from 'react';
import { Link } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';
import { useApi } from 'src/services/api/utils';

function ProducerDashboard() {
  const api = useApi();

  async function test() {
    await api.photosGet();
    console.log('response received');
  }

  return (
    <DashboardLayout mode="Producer">
      <button onClick={test}>Test API</button>
      <h1>Dashboard</h1>
      <Link to="settings">Settings</Link>
    </DashboardLayout>
  );
}

export default ProducerDashboard;
