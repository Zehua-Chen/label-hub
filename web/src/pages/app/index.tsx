import * as React from 'react';
import { Link } from 'gatsby';
import HeadContent from 'src/components/HeadContent';
import Layout from 'src/components/Layout';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { authRouteGuard } from 'src/services/auth';

function App() {
  return (
    <ProtectedRoute condition={authRouteGuard()}>
      <Layout>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='producer'>Producer</Link>
          </li>
          <li className='list-group-item'>
            <Link to='consumer'>Consumer</Link>
          </li>
        </ul>
      </Layout>
    </ProtectedRoute>
  );
}

export function Head() {
  return <HeadContent title='Label Hub' />;
}

export default App;
