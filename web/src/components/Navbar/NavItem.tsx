import React, { HTMLProps, PropsWithChildren } from 'react';

function NavItem(
  props: PropsWithChildren<HTMLProps<HTMLLIElement>>
): JSX.Element {
  const { className, ...others } = props;
  return <li className={`nav-item ${className}`} {...others}></li>;
}

export default NavItem;
