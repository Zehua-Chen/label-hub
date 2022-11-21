import { useUser } from 'src/services/user';

describe('useUser', () => {
  it('parse from url', () => {
    const user = useUser({
      url: 'http://localhost:8000/app/#id_token=id&access_token=access&expires_in=expires&token_type=Bearer',
      setUserToCache: jest.fn(),
      getUserFromCache: jest.fn(),
    });

    expect(user.token).toBe('id');
  });

  // it('load from local storage', () => {});
});
