import React, { useState } from 'react';
import { PageProps } from 'gatsby';
import useSWR from 'swr';
import DashboardLayout from 'src/components/DashboardLayout';
import { GetPhotosResponse } from 'src/services/api';
import { useApi } from 'src/services/api/utils';
import { useAuth } from 'src/services/auth';

function Buy(props: PageProps) {
  const { params } = props;
  const { project } = params;
  const api = useApi();
  const auth = useAuth();
  const [label, setLabel] = useState('');
  const [photos, setPhotos] = useState<GetPhotosResponse>();

  const { data: userInfo, isLoading: isUserInfoLoading } = useSWR(
    `/app/consumer/projects/${project}/project`,
    () => api.userinfoGet({ accessToken: auth.accessToken })
  );

  async function buyPhoto(photoID: string) {
    await api.projectsPut({
      accessToken: auth.accessToken,
      putProjectsRequest: {
        projectID: userInfo?.projectID,
        photoID,
      },
    });
  }

  async function onSearchClick() {
    const photos = await api.photosGet({ labels: label });
    setPhotos(photos);
  }

  return (
    <DashboardLayout mode='Consumer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Market Place</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input
              placeholder='Label'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            ></input>
            <button className='btn btn-primary' onClick={onSearchClick}>
              Search
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {!photos ? null : (
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
                        <button
                          className='btn btn-primary'
                          disabled={isUserInfoLoading}
                          onClick={() => buyPhoto(photoId)}
                        >
                          Buy
                        </button>
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
