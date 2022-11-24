import React, { PropsWithChildren } from 'react';
import { Link } from '@reach/router';
import Layout from 'src/components/Layout';
import NavItem from './NavItem';

export interface DashboardLayoutProps {
  mode: string;
}

function DashboardLayout(
  props: PropsWithChildren<DashboardLayoutProps>
): JSX.Element {
  const { mode } = props;

  return (
    <Layout
      navigation={
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Label Hub
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavItem className="dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {mode}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/app/producer">
                        Producer
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/app/consumer">
                        Consumer
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider"></hr>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/app/settings">
                        Settings
                      </Link>
                    </li>
                  </ul>
                </NavItem>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      }
    >
      {props.children}
    </Layout>
  );
}

export default DashboardLayout;
