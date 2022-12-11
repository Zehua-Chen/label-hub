import * as React from 'react';
import { useRef, useEffect } from 'react';
import { useLocation } from '@reach/router';

function LoginLink(): JSX.Element {
  const location = useLocation();
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!link.current) {
      return;
    }

    link.current.href = `${process.env.AUTH_DOMAIN}/login?response_type=token&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${location.href}app`;
  }, [link, location]);

  return <a ref={link}>Login/Signup</a>;
}

export default LoginLink;
