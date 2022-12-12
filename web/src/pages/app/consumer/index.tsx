import * as React from 'react';
import { Link } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { authRouteGuard } from 'src/services/auth';

interface Project {
  name: string;
  id: string;
}

function useProjects(): Project[] {
  const photos: Project[] = [];

  for (let i = 0; i < 5; i++) {
    photos.push({
      name: `Project ${i}`,
      id: `${i}`,
    });
  }

  return photos;
}

function ProducerDashboard() {
  const projects = useProjects();

  return (
    <ProtectedRoute condition={authRouteGuard()}>
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
              <div className='col d-grid'>
                <div className='btn btn-primary'>New Project</div>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col'>
                <ul className='list-group'>
                  {projects.map((project) => (
                    <Link
                      className='list-group-item'
                      to={`/app/consumer/projects/${project.id}`}
                      key={project.id}
                    >
                      {project.name}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        }
      >
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Balance $100</h1>
              <h2>100 photos purchased</h2>
              <h3>$100 spent</h3>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default ProducerDashboard;
