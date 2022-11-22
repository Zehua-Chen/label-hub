export interface Auth {
  token: string;
}

export interface UseUserOptions {
  url?: string;
  getAuthFromCache?: () => Auth | null;
  setAuthToCache?: (auth: Auth) => any;
}

const LOCALSTORAGE_AUTH_KEY = 'auth';

function getAuthFromLocalStorage(): Auth | null {
  const json = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

  if (!json) {
    return null;
  }

  return JSON.parse(json) as Auth;
}

function setAuthToLocalStorage(auth: Auth): void {
  localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(auth));
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(LOCALSTORAGE_AUTH_KEY) !== null;
}

export function useAuth(options: UseUserOptions = {}): Auth {
  const {
    url = globalThis.document ? document.URL : 'https://localhost',
    getAuthFromCache: getUserFromCache = getAuthFromLocalStorage,
    setAuthToCache: setUserToCache = setAuthToLocalStorage,
  } = options;

  let user: Auth | null = null;

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
