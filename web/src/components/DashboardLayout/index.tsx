import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';
import Layout from 'src/components/Layout';
import Navbar, { NavItem } from 'src/components/Navbar';
import DropDown, { DropDownItem } from 'src/components/DropDown';
import * as classes from './index.module.css';
import classNames from 'classnames';

export interface DashboardLayoutProps {
  mode: string;
  sidebar?: JSX.Element;
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
              <DropDown title={mode}>
                <DropDownItem>
                  <Link className='dropdown-item' to='/app/producer'>
                    Producer
                  </Link>
                </DropDownItem>
                <DropDownItem>
                  <Link className='dropdown-item' to='/app/consumer'>
                    Consumer
                  </Link>
                </DropDownItem>
                <DropDownItem>
                  <Link className='dropdown-item' to='/app/settings'>
                    Settings
                  </Link>
                </DropDownItem>
              </DropDown>
            </NavItem>
            {navigationItems}
          </Navbar>
        }
      >
        <div className='flex-grow-1 d-flex flex-row'>
          {sidebar ? (
            <div className={classNames('border-end', classes.sidebar)}>
              {sidebar}
            </div>
          ) : null}
          <div className='container'>{props.children}</div>
        </div>
      </Layout>
    </div>
  );
}

export default DashboardLayout;
