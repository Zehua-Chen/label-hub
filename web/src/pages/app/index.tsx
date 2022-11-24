import React, { FC, StrictMode } from 'react';
import { navigate } from 'gatsby';
import { Router, RouteComponentProps, Link } from '@reach/router';
import HeadContent from 'src/components/HeadContent';
import Layout from 'src/components/Layout';
import ProducerDashboard from 'src/components/ProducerDashboard';
import ConsumerDashboard from 'src/components/ConsumerDashboard';
import Settings from 'src/components/Settings';
import ProducerUpload from 'src/components/ProducerUpload';
import ProtectedRoute from 'src/components/ProtectedRoute';
import { isLoggedIn, AuthContext, getAuth } from 'src/services/auth';
import { ApiProvider } from 'src/services/api/utils';

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
    <ul>
      <li>
        <Link to="producer">Producer</Link>
      </li>
      <li>
        <Link to="consumer">Consumer</Link>
      </li>
    </ul>
  </Layout>,
  'AppPage'
);

function App() {
  return (
    <StrictMode>
      <AuthContext.Provider value={getAuth()}>
        <ApiProvider>
          <Router basepath="/app">
            <AppPage path="/"></AppPage>
            <ProducerDashboardPage path="producer"></ProducerDashboardPage>
            <ProducerUploadPage path="producer/upload" />
            <ConsumerDashboardPage path="consumer"></ConsumerDashboardPage>
            <SettingsPage path="settings"></SettingsPage>
          </Router>
        </ApiProvider>
      </AuthContext.Provider>
    </StrictMode>
  );
}

export function Head() {
  return <HeadContent title="Label Hub" />;
}

export default App;
