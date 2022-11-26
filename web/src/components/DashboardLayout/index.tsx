import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';
import Layout from 'src/components/Layout';
import Navbar, { NavItem } from 'src/components/Navbar';
import * as classes from './index.module.css';

export interface DashboardLayoutProps {
  mode: string;
  sidebar: JSX.Element;
  navigationItems?: JSX.Element[];
}

function DashboardLayout(
  props: PropsWithChildren<DashboardLayoutProps>
): JSX.Element {
  const { mode, sidebar, navigationItems } = props;

  return (
    <div className='min-vh-100 d-flex flex-column'>
      <Layout
        container={false}
        navigation={
          <Navbar title='Label Hub'>
            <NavItem className='dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {mode}
              </Link>
              <ul className='dropdown-menu'>
                <li>
                  <Link className='dropdown-item' to='/app/producer'>
                    Producer
                  </Link>
                </li>
                <li>
                  <Link className='dropdown-item' to='/app/consumer'>
                    Consumer
                  </Link>
                </li>
                <li>
                  <hr className='dropdown-divider'></hr>
                </li>
                <li>
                  <Link className='dropdown-item' to='/app/settings'>
                    Settings
                  </Link>
                </li>
              </ul>
            </NavItem>
            {navigationItems}
          </Navbar>
        }
      >
        <div className='flex-grow-1 d-flex flex-row'>
          <div className={`bg-secondary ${classes.sidebar}`}>{sidebar}</div>
          <div className='container'>{props.children}</div>
        </div>
      </Layout>
    </div>
  );
}

export default DashboardLayout;
