import React from 'react';
import { Link } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';

function ProducerDashboard() {
  return (
    <DashboardLayout mode='Producer' sidebar={<div>Sidebar</div>}>
      <Link className='btn btn-primary' to='/app/producer/upload'>
        Upload
      </Link>
    </DashboardLayout>
  );
}

export default ProducerDashboard;
