import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  AuthContext,
  parseAuth,
  hasAuthExpired,
  useAuth,
} from 'src/services/auth';

describe('parseAuth', () => {
  it('parse from url', () => {
    const auth = parseAuth({
      url: 'http://localhost:8000/app/#id_token=id&access_token=access&expires_in=3600&token_type=Bearer',
    });

    expect(auth?.idToken).toBe('id');
    expect(auth?.accessToken).toBe('access');
    expect(auth?.expiresIn).toBe(3600000);
    expect(auth?.created).toBeGreaterThan(0);
  });
});

describe('hasAuthExpired', () => {
  it('expired', () => {
    const expired = hasAuthExpired({
      idToken: '',
      accessToken: '',
      created: 0,
      expiresIn: 0,
    });

    expect(expired).toBeTruthy();
  });
});

describe('useAuth', () => {
  it('default', () => {
    function TestComponent() {
      const auth = useAuth();
      return <div aria-label='token'>{auth.idToken}</div>;
    }

    render(
      <AuthContext.Provider
        value={{
          idToken: 'test token',
          accessToken: 'test token',
          created: 1,
          expiresIn: 2,
        }}
      >
        <TestComponent />
      </AuthContext.Provider>
    );

    const token = screen.getByLabelText('token');

    expect(token.textContent).toBe('test token');
  });
});
