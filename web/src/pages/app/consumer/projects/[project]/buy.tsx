import * as React from 'react';
import { useId } from 'react';
import { PageProps } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';
import Checkbox from 'src/components/Checkbox';

function Buy(props: PageProps) {
  const { params } = props;
  const { project } = params;
  const inputCountId = useId();

  function onBuyClick(e: React.MouseEvent) {
    e.preventDefault();
  }

  return (
    <DashboardLayout mode='Consumer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Buy For Project {project}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <form>
              <div className='mb-3'>
                <Checkbox label='Tag 1' />
                <Checkbox label='Tag 2' />
                <Checkbox label='Tag 3' />
              </div>
              <div className='mb-3'>
                <label htmlFor={inputCountId} className='form-label'>
                  Count
                </label>
                <input
                  type='number'
                  className='form-control'
                  id={inputCountId}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={onBuyClick}
              >
                Buy
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Buy;
