import * as React from 'react';
import { PageProps } from 'gatsby';
import useSWR from 'swr';
import DashboardLayout from 'src/components/DashboardLayout';
import { useApi } from 'src/services/api/utils';

function Buy(props: PageProps) {
  const { params } = props;
  const { project } = params;
  const api = useApi();

  const { data: photos, isLoading: isPhotosLoading } = useSWR(
    `/app/consumer/projects/${project}/photos`,
    () => api.photosGet({ labels: 'xbox' })
  );

  function buyPhoto() {}

  return (
    <DashboardLayout mode='Consumer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            {isPhotosLoading ? null : (
              <ul className='list-group'>
                {photos?.results?.map((photo) => {
                  if (!photo.url) {
                    return null;
                  }

                  const segments = photo.url.split('/');
                  const photoId = segments[segments.length - 1];

                  return (
                    <li key={photo.url} className='list-group-item'>
                      <div>{photoId}</div>
                      <div>Labels {photo.labels}</div>
                      <div>
                        <button className='btn btn-primary'>Buy</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Buy;
