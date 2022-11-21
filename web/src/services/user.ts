export interface User {
  token: string;
}

export interface UseUserOptions {
  url?: string;
  getUserFromCache?: () => User | null;
  setUserToCache?: (user: User) => any;
}

function getUserFromLocalStorage(): User | null {
  const json = localStorage.getItem('user');

  if (!json) {
    return null;
  }

  return JSON.parse(json) as User;
}

function setUserToLocalStorage(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function isLoggedIn(): boolean {
  return false;
}

export function useUser(options: UseUserOptions = {}): User {
  const {
    url = globalThis.document ? document.URL : 'https://localhost',
    getUserFromCache = getUserFromLocalStorage,
    setUserToCache = setUserToLocalStorage,
  } = options;

  let user: User | null = null;

  if (url.match(/id_token/)) {
    const queries = url
      .substring(url.indexOf('id_token'))
      .split('&')
      .reduce((previous, current) => {
        const segments = current.split('=');
        previous[segments[0]] = segments[1];
        return previous;
      }, {} as any);

    user = {
      token: queries['id_token'],
    };

    setUserToCache(user);
  }

  if (!user) {
    user = getUserFromCache();
  }

  if (!user) {
    throw new Error('Unable to get user');
  }

  return user;
}
