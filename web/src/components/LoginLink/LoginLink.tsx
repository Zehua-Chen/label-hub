import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';

function LoginLink(): JSX.Element {
  const location = useLocation();
  const [link, setLink] = useState('');

  useEffect(() => {
    setLink(
      `${process.env.AUTH_DOMAIN}/login?response_type=token&client_id=${process.env.COGNITO_CLIENT_ID}&redirect_uri=${location.href}app`
    );
  }, [link, setLink, location]);

  return <a href={link}>Login/Signup</a>;
}

export default LoginLink;
