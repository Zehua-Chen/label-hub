import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

export interface NavbarProps {
  title: string;
  sticky?: boolean;
}

function Navbar(props: PropsWithChildren<NavbarProps>): JSX.Element {
  const { title, sticky = true, children } = props;

  return (
    <nav
      className={classNames('navbar', 'navbar-expand-lg', 'bg-light', {
        'sticky-top': sticky,
      })}
    >
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          {title}
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>{children}</ul>
          {/* <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
export { default as NavItem } from './NavItem';
