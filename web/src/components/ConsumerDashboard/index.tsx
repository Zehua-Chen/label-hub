import React from 'react';
import DashboardLayout from 'src/components/DashboardLayout';

function ConsumerDashboard(): JSX.Element {
  return (
    <DashboardLayout mode='Consumer' sidebar={<div>Sidebar</div>}>
      <div>Consumer</div>
    </DashboardLayout>
  );
}

export default ConsumerDashboard;
