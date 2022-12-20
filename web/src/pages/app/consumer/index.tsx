import * as React from 'react';
import { Link } from 'gatsby';
import useSWR from 'swr';
import DashboardLayout from 'src/components/DashboardLayout';
import { useApi } from 'src/services/api/utils';
import { useAuth } from 'src/services/auth';

function ProducerDashboard() {
  const api = useApi();
  const auth = useAuth();

  const { data: project, isLoading: isProjectLoading } = useSWR(
    '/app/consumer/project',
    () => api.userinfoGet({ accessToken: auth.accessToken })
  );

  return (
    <DashboardLayout
      mode='Producer'
      sidebar={
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <ul className='list-group'>
                <li className='list-group-item'>Overview</li>
              </ul>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col'>
              <ul className='list-group'>
                {isProjectLoading ? (
                  <li>...</li>
                ) : (
                  <Link
                    className='list-group-item'
                    to={`/app/consumer/projects/${project?.projectID}`}
                  >
                    Project
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      }
    >
      <div className='container'>
        <div className='row'>
          <div className='col'></div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProducerDashboard;
