import React, { StrictMode } from 'react';
import { Helmet } from 'react-helmet';

function NotFound() {
  return (
    <StrictMode>
      <div>
        <Helmet>
          <title>Label Hub</title>
        </Helmet>
        <h1>Not Found</h1>
      </div>
    </StrictMode>
  );
}

export default NotFound;
