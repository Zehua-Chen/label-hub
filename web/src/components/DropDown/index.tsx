import React, { PropsWithChildren, useRef, useEffect } from 'react';
import { Dropdown } from 'bootstrap';

export interface DropDownProps {
  title: string;
}

function DropDown(props: PropsWithChildren<DropDownProps>) {
  const { title, children } = props;
  const dropDown = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (dropDown.current) {
      new Dropdown(dropDown.current, {});
    }
  }, []);

  return (
    <>
      <a
        className='nav-link dropdown-toggle'
        href='#'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        ref={dropDown}
      >
        {title}
      </a>
      {/* have to set margin to 0 to remove popperjs warnings */}
      <ul className='dropdown-menu' style={{ margin: 0 }}>
        {children}
      </ul>
    </>
  );
}

export default DropDown;
export { default as DropDownItem } from './DropDownItem';
