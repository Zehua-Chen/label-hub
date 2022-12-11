import * as React from 'react';
import { createContext, useContext, PropsWithChildren } from 'react';
import { navigate } from 'gatsby';

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
}

export function useAuth(): Auth {
  return useContext(AuthContext);
}

/**
 * Try parse auth.
 * - If auth exists in URL, store auth in local storage and clear URL.
 * - If auth exists in storage, returns auth
 * @returns
 */
function getAuth(): Auth {
  let auth = parseAuth();

  if (auth) {
    setAuthToLocalStorage(auth);

    // Remove sensitive data from URL
    navigate(window.location.pathname, { replace: true });

    return auth;
  }

  auth = getAuthFromLocalStorage();

  if (!auth || hasAuthExpired(auth)) {
    auth = INVALID_AUTH;
  }

  return auth;
}

export function AuthProvider(props: PropsWithChildren<unknown>) {
  const { children } = props;

  return (
    <AuthContext.Provider value={getAuth()}>{children}</AuthContext.Provider>
  );
}

export function authRouteGuard(): () => boolean {
  return process.env.AUTH_ENABLED === 'true' ? isLoggedIn : () => true;
}
