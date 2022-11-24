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
    <DashboardLayout mode="Producer" sidebar={<div>Sidebar</div>}>
      <Link className="btn btn-primary" to="/app/producer/upload">
        Upload
      </Link>
    </DashboardLayout>
  );
}

export default ProducerDashboard;
