import * as React from 'react';
import { PageProps } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { authRouteGuard } from 'src/services/auth';

function Project(props: PageProps): JSX.Element {
  const { params } = props;
  const { project } = params;

  return (
    <ProtectedRoute condition={authRouteGuard()}>
      <DashboardLayout mode='Consumer'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Project {project}</h1>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default Project;
