import * as React from 'react';
import DashboardLayout from 'src/components/DashboardLayout';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { authRouteGuard } from 'src/services/auth';

function ConsumerDashboard(): JSX.Element {
  return (
    <ProtectedRoute condition={authRouteGuard()}>
      <DashboardLayout mode='Consumer' sidebar={<div>Sidebar</div>}>
        <div>Consumer</div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default ConsumerDashboard;
