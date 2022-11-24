import React, { StrictMode } from 'react';
import { Link } from 'gatsby';
import HeadContent from 'src/components/HeadContent';
import Layout from 'src/components/Layout';

function Index() {
  return (
    <StrictMode>
      <Layout>
        <h1>Lable Hub</h1>
        <div>
          <Link to="/app">App</Link>
        </div>
        <div>
          <a
            href={`${process.env.AUTH_DOMAIN}/login?response_type=token&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${document.URL}app`}
          >
            Login/Signup
          </a>
        </div>
      </Layout>
    </StrictMode>
  );
}

export function Head() {
  return <HeadContent title="Label Hub" />;
}

export default Index;
