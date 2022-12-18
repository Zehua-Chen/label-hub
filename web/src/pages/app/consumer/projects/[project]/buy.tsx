import * as React from 'react';
import { PageProps } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';

function Buy(props: PageProps) {
  const { params } = props;
  const { project } = params;

  return (
    <DashboardLayout mode='Consumer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Buy For Project {project}</h1>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Buy;
