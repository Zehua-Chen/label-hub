import React from 'react';
import { Link } from 'gatsby';
import { useApi } from 'src/services/api/utils';

function ProducerDashboard() {
  const api = useApi();

  async function test() {
    await api.photosGet();
    console.log('response received');
  }

  return (
    <div>
      <button onClick={test}>Test API</button>
      <h1>Dashboard</h1>
      <Link to="settings">Settings</Link>
    </div>
  );
}

export default ProducerDashboard;
