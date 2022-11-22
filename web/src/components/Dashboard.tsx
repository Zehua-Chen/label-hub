import React from 'react';
import { Link } from 'gatsby';
import { useAuth } from 'src/services/auth';
import { DefaultApi, Configuration } from 'src/services/api';

async function test() {
  const auth = useAuth();
  const api = new DefaultApi(new Configuration({ apiKey: auth.token }));

  await api.photosGet();
  console.log('response received');
}

function Dashboard() {
  return (
    <div>
      <button onClick={test}>Test API</button>
      <h1>Dashboard</h1>
      <Link to="settings">Settings</Link>
    </div>
  );
}

export default Dashboard;
