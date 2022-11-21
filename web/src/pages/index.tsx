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
      <Link to="/app">App</Link>
    </div>
  );
}

export default Index;
