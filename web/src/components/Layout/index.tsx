import React, { PropsWithChildren } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout(props: PropsWithChildren<unknown>): JSX.Element {
  const { children } = props;

  return <div className="container">{children}</div>;
}

export default Layout;
