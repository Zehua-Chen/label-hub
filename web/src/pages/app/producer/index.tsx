import * as React from 'react';
import { Link } from 'gatsby';
import useSWR from 'swr';
import DashboardLayout from 'src/components/DashboardLayout';
import Checkbox from 'src/components/Checkbox';
import { useApi } from 'src/services/api/utils';
import { useAuth } from 'src/services/auth';

interface Tag {
  displayName: string;
}

function useTags(): Tag[] {
  return [
    // {
    //   displayName: 'Cat',
    // },
    // {
    //   displayName: 'Dog',
    // },
  ];
}

function ProducerDashboard() {
  const tags = useTags();

  const auth = useAuth();
  const api = useApi();

  const { data: income, isLoading: isIncomeLoading } = useSWR(
    '/app/producer/income',
    () =>
      api.incomeGet({
        accessToken: auth.accessToken,
      })
  );

  const { data: photos, isLoading: isPhotosLoading } = useSWR(
    '/app/producer/photos',
    () =>
      api.photosProducerGet({
        accessToken: auth.accessToken,
      })
  );

  return (
    <DashboardLayout
      mode='Producer'
      sidebar={
        <div>
          <form className='container'>
            <div className='row'>
              <div className='col'>
                <label className='form-label'>Date</label>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' id='today' />
                  <label className='form-check-label' htmlFor='today'>
                    Today
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label className='form-label'>Income</label>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' id='today' />
                  <label className='form-check-label' htmlFor='today'>
                    $0-30
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label className='form-label'>Labels</label>
                {tags.map((tag, index) => (
                  <Checkbox
                    key={tag.displayName}
                    label={tag.displayName}
                  ></Checkbox>
                ))}
              </div>
            </div>
          </form>
        </div>
      }
    >
      <div className='container'>
        <div className='row pt-3'>
          <div className='col-10'>
            <h1>Income</h1>
            {isIncomeLoading ? <h2>...</h2> : <h2>${income?.income}</h2>}
          </div>
          <div className='col'>
            <Link className='btn btn-primary' to='/app/producer/upload'>
              Upload
            </Link>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Filename</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Income</th>
                  <th scope='col'>Tags</th>
                </tr>
              </thead>
              <tbody>
                {isPhotosLoading ? (
                  <tr></tr>
                ) : (
                  photos?.map((photo, index) => (
                    <tr key={index}>
                      <th scope='row'>{photo.filename}</th>
                      <td>{photo.time}</td>
                      <td>{photo.amount}</td>
                      <td>{photo.tags?.join(', ') ?? ''}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProducerDashboard;
