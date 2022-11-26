import React, { PropsWithChildren } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

export interface LayoutProps {
  navigation?: JSX.Element;
  container?: boolean;
}

function Layout(props: PropsWithChildren<LayoutProps>): JSX.Element {
  const { navigation, children, container = true } = props;

  return (
    <>
      {navigation}
      {container ? <div className='container'>{children}</div> : children}
    </>
  );
}

export default Layout;
