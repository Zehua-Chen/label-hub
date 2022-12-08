import React, { StrictMode } from 'react';
import { Link } from 'gatsby';
import HeadContent from 'src/components/HeadContent';
import Layout from 'src/components/Layout';
import LoginLink from 'src/components/LoginLink';

function Index() {
  return (
    <StrictMode>
      <Layout>
        <h1>Lable Hub</h1>
        <div>
          <Link to='/app'>App</Link>
        </div>
        <div>
          <LoginLink />
        </div>
      </Layout>
    </StrictMode>
  );
}

export function Head() {
  return <HeadContent title='Label Hub' />;
}

export default Index;
