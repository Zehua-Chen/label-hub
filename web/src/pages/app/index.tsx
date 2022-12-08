import React, { FC, StrictMode } from 'react';
import { navigate } from 'gatsby';
import { Router, RouteComponentProps, Link } from '@reach/router';
import loadable from '@loadable/component';
import HeadContent from 'src/components/HeadContent';
import Layout from 'src/components/Layout';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { isLoggedIn, AuthProvider } from 'src/services/auth';
import { ApiProvider } from 'src/services/api/utils';

const ProducerDashboard = loadable(
  () => import('src/components/ProducerDashboard')
);

const ConsumerDashboard = loadable(
  () => import('src/components/ConsumerDashboard')
);

const Settings = loadable(() => import('src/components/Settings'));
const ProducerUpload = loadable(() => import('src/components/ProducerUpload'));

function protectedRouteCondition(): () => boolean {
  return process.env.AUTH_ENABLED === 'true' ? isLoggedIn : () => true;
}

function makePage(
  children: JSX.Element,
  displayName: string
): FC<RouteComponentProps> {
  function Page() {
    return (
      <ProtectedRoute condition={protectedRouteCondition()} navigate={navigate}>
        {children}
      </ProtectedRoute>
    );
  }

  Page.displayName = displayName;

  return Page;
}

const ProducerDashboardPage = makePage(
  <ProducerDashboard />,
  'ProducerDashboardPage'
);

const ProducerUploadPage = makePage(<ProducerUpload />, 'ProducerUploadPage');

const ConsumerDashboardPage = makePage(
  <ConsumerDashboard />,
  'ConsumerDashboardPage'
);

const SettingsPage = makePage(<Settings />, 'SettingsPage');

const AppPage = makePage(
  <Layout>
    <ul className='list-group'>
      <li className='list-group-item'>
        <Link to='producer'>Producer</Link>
      </li>
      <li className='list-group-item'>
        <Link to='consumer'>Consumer</Link>
      </li>
    </ul>
  </Layout>,
  'AppPage'
);

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <ApiProvider>
          <Router basepath='/app'>
            <AppPage path='/'></AppPage>
            <ProducerDashboardPage path='producer'></ProducerDashboardPage>
            <ProducerUploadPage path='producer/upload' />
            <ConsumerDashboardPage path='consumer'></ConsumerDashboardPage>
            <SettingsPage path='settings'></SettingsPage>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </StrictMode>
  );
}

export function Head() {
  return <HeadContent title='Label Hub' />;
}

export default App;
