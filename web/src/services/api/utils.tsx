import React, { createContext, useContext, PropsWithChildren } from 'react';
import { DefaultApi, Configuration } from '.';
import { useAuth } from 'src/services/auth';

export const ApiContext = createContext(new DefaultApi());

export function ApiProvider(props: PropsWithChildren<unknown>) {
  const auth = useAuth();

  return (
    <ApiContext.Provider
      value={
        new DefaultApi(
          new Configuration({
            apiKey: auth.idToken,
            basePath: process.env.API_BASE_PATH,
          })
        )
      }
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export function useApi(): DefaultApi {
  return useContext(ApiContext);
}
