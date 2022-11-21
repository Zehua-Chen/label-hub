import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

function Index() {
  return (
    <div>
      <Helmet>
        <title>Label Hub</title>
      </Helmet>

      <h1>Lable Hub</h1>
      <div>
        <Link to="/app">App</Link>
      </div>
      <div>
        <a
          href={`${process.env.AUTH_DOMAIN}/login?response_type=token&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${document.URL}`}
        >
          Login/Signup
        </a>
      </div>
    </div>
  );
}

export default Index;
