import { createContext, useContext } from 'react';

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
const INVALID_AUTH: Auth = { token: 'invalid', created: 0, expiresIn: 0 };

export const AuthContext = createContext<Auth>(INVALID_AUTH);

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
}

export function parseAuth(options: ParseAuthOptions = {}): Auth | null {
  const { url = globalThis.document ? document.URL : 'https://localhost' } =
    options;

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

    return auth;
  }

  return null;

  // TODO: clear url after parsing
}

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function getAuth(): Auth {
  let auth = parseAuth();

  if (auth) {
    setAuthToLocalStorage(auth);
    return auth;
  }

  auth = getAuthFromLocalStorage();

  if (!auth || hasAuthExpired(auth)) {
    auth = INVALID_AUTH;
  }

  return auth;
}
