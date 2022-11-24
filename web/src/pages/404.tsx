import React, { StrictMode } from 'react';
import HeadContent from 'src/components/HeadContent';

function NotFound() {
  return (
    <StrictMode>
      <div>
        <h1>Not Found</h1>
      </div>
    </StrictMode>
  );
}

export function Head(): JSX.Element {
  return <HeadContent title='Page Not Found' />;
}

export default NotFound;
