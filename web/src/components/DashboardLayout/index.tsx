import React, { PropsWithChildren } from 'react';
import Layout from 'src/components/Layout';

function DashboardLayout(props: PropsWithChildren<unknown>): JSX.Element {
  return <Layout>{props.children}</Layout>;
}

export default DashboardLayout;
