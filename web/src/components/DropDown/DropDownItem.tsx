import React, { PropsWithChildren } from 'react';

function DropDownItem(props: PropsWithChildren<unknown>) {
  const { children } = props;

  return <li>{children}</li>;
}

export default DropDownItem;
