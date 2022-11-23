export interface Auth {
  token: string;
  /**
   * Milliseconds
   */
  created: number;
  /**
   * Milliseconds
   */
  expiresIn: number;
}

const LOCALSTORAGE_AUTH_KEY = 'AUTH';

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

export function hasAuthExpired(auth: Auth): boolean {
  const { created, expiresIn } = auth;
  return created + expiresIn < Date.now();
}

export function isLoggedIn(): boolean {
  const auth = getAuthFromLocalStorage();

  if (!auth) {
    return false;
  }

  return !hasAuthExpired(auth);
}

export interface ParseAuthOptions {
  url?: string;
  setAuthToCache?: (auth: Auth) => unknown;
}

export function parseAuth(options: ParseAuthOptions = {}): void {
  const {
    url = globalThis.document ? document.URL : 'https://localhost',
    setAuthToCache: setUserToCache = setAuthToLocalStorage,
  } = options;

  if (url.match(/id_token/)) {
    const queries = url
      .substring(url.indexOf('id_token'))
      .split('&')
      .reduce((previous, current) => {
        const segments = current.split('=');
        previous[segments[0]] = segments[1];
        return previous;
      }, {} as Record<string, string>);

    const auth: Auth = {
      token: queries['id_token'],
      created: Date.now(),
      expiresIn: Number.parseInt(queries['expires_in']) * 1000,
    };

    setUserToCache(auth);
  }

  // TODO: clear url after parsing
}

export interface UseAuthOptions {
  url?: string;
  getAuthFromCache?: () => Auth | null;
}

export function useAuth(options: UseAuthOptions = {}): Auth {
  const { getAuthFromCache: getUserFromCache = getAuthFromLocalStorage } =
    options;

  const auth = getUserFromCache();

  if (!auth) {
    throw new Error('Unable to get user');
  }

  if (hasAuthExpired(auth)) {
    throw new Error('auth ahs expired');
  }

  return auth;
}
