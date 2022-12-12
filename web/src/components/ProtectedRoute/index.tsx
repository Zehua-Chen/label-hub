import { PropsWithChildren, useEffect } from 'react';
import { navigate as gatsbyNavgiate } from 'gatsby';
import { NavigateFn } from '@reach/router';

export interface ProtectedRouteProps {
  /**
   * Returns true if the route can be accessed. Returns false to redirect to
   * `fallback`
   */
  condition: () => boolean;
  navigate?: NavigateFn;
  fallback?: string;
}

function ProtectedRoute(
  props: PropsWithChildren<ProtectedRouteProps>
): JSX.Element {
  const {
    condition,
    navigate = gatsbyNavgiate,
    fallback = '/',
    children,
  } = props;

  useEffect(() => {
    // Only protect route on client side
    if (!condition()) {
      navigate(fallback);
    }
  }, []);

  return children as JSX.Element;
}

export default ProtectedRoute;
