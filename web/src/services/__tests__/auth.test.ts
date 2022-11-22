import { useAuth } from 'src/services/auth';

describe('useAuth', () => {
  it('parse from url', () => {
    const user = useAuth({
      url: 'http://localhost:8000/app/#id_token=id&access_token=access&expires_in=expires&token_type=Bearer',
      setAuthToCache: jest.fn(),
      getAuthFromCache: jest.fn(),
    });

    expect(user.token).toBe('id');
  });

  // it('load from local storage', () => {});
});
