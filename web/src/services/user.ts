export interface User {
  token: string;
}

export interface UseUserOptions {
  url?: string;
}

export function useUser(options: UseUserOptions = {}): User {
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
      }, {} as any);

    return {
      token: queries['id_token'],
    };
  }

  return { token: '' };
}
