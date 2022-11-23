import React from 'react';
import { Link } from 'gatsby';
import { useAuth } from 'src/services/auth';
import { DefaultApi, Configuration } from 'src/services/api';

function ProducerDashboard() {
  const auth = useAuth();

  async function test() {
    const api = new DefaultApi(new Configuration({ apiKey: auth.token }));

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
