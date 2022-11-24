import React, { PropsWithChildren } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

export interface LayoutProps {
  navigation?: JSX.Element;
}

function Layout(props: PropsWithChildren<LayoutProps>): JSX.Element {
  const { navigation, children } = props;

  return (
    <>
      {navigation}
      <div className="container">{children}</div>
    </>
  );
}

export default Layout;
