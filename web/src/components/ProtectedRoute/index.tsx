import { PropsWithChildren } from 'react';
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
): JSX.Element | null {
  const {
    condition,
    navigate = gatsbyNavgiate,
    fallback = '/',
    children,
  } = props;

  if (condition()) {
    return children as JSX.Element;
  }

  navigate(fallback);

  return null;
}

export default ProtectedRoute;
