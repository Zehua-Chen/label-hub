import { Auth, parseAuth, useAuth } from 'src/services/auth';

describe('parseAuth', () => {
  it('parse from url', () => {
    let auth: Auth = { token: '', expiresIn: 0, created: 0 };

    parseAuth({
      url: 'http://localhost:8000/app/#id_token=id&access_token=access&expires_in=3600&token_type=Bearer',
      setAuthToCache: (a) => {
        auth = a;
      },
    });

    expect(auth.token).toBe('id');
    expect(auth.expiresIn).toBe(3600000);
    expect(auth.created).toBeGreaterThan(0);
  });
});

describe('useAuth', () => {
  it('auth expired', () => {
    expect(() => {
      useAuth({
        getAuthFromCache: () => ({
          token: '',
          created: 0,
          expiresIn: 30,
        }),
      });
    }).toThrow();
  });
});
