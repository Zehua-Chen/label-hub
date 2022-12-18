import * as React from 'react';
import { PageProps, Link } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { authRouteGuard } from 'src/services/auth';

interface TagInfo {
  tag: string;
  count: number;
}

function useTagInfos(): TagInfo[] {
  return [
    {
      tag: 'Cat',
      count: 100,
    },
    {
      tag: 'Dogs',
      count: 100,
    },
    {
      tag: 'Coffee',
      count: 100,
    },
  ];
}

function Project(props: PageProps): JSX.Element {
  const { params } = props;
  const { project } = params;
  const tags = useTagInfos();

  return (
    <ProtectedRoute condition={authRouteGuard()}>
      <DashboardLayout mode='Consumer'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Project {project}</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Tag</th>
                    <th scope='col'># of Photos</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag) => (
                    <tr key={tag.tag}>
                      <th scope='row'>{tag.tag}</th>
                      <td>{tag.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='row'>
              <div className='col'>
                <Link className='btn btn-primary' to='buy'>
                  Buy
                </Link>
                <button className='btn btn-primary'>Download</button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default Project;
