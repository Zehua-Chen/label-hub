import * as React from 'react';
import { useLocation } from '@reach/router';

function LoginLink(): JSX.Element {
  const location = useLocation();
  const loginURL = `${process.env.AUTH_DOMAIN}/login?response_type=token&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${location.href}app`;

  return <a href={loginURL}>Login/Signup</a>;
}

export default LoginLink;
