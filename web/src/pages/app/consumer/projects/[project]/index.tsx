import * as React from 'react';
import { useState } from 'react';
import { PageProps, Link } from 'gatsby';
import useSWR from 'swr';
import DashboardLayout from 'src/components/DashboardLayout';
import Download, { DownloadContent } from 'src/components/Download';
import { useApi } from 'src/services/api/utils';
import { useAuth } from 'src/services/auth';

function Project(props: PageProps): JSX.Element {
  const { params } = props;
  const { project } = params;
  const api = useApi();
  const auth = useAuth();
  const [files, setFiles] = useState([] as DownloadContent[]);

  const { data: photos, isLoading: isPhotosLoading } = useSWR(
    `/app/consumer/projects/${project}/projects`,
    () => api.projectsGet({ accessToken: auth.accessToken, projectId: project })
  );

  async function onDownloadClick() {
    console.log(auth.accessToken);
    console.log(project);

    const responseFiles = await api.downloadGet({
      accessToken: auth.accessToken,
      projectId: project,
    });

    setFiles(responseFiles.map((file) => new DownloadContent(file)));
  }

  return (
    <DashboardLayout mode='Consumer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Project {project}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Photo</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Time</th>
                </tr>
              </thead>
              {isPhotosLoading ? null : (
                <tbody>
                  {photos?.photos?.map((photo) => (
                    <tr key={photo.filename}>
                      <th scope='row'>{photo.filename}</th>
                      <td>{photo.amount}</td>
                      <td>{photo.time}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          <div className='row'>
            <div className='col'>
              <Link className='btn btn-primary' to='buy'>
                Buy
              </Link>
              <button className='btn btn-primary' onClick={onDownloadClick}>
                Download
              </button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <ul className='list-group'>
              {files.map((file, index) => (
                <Download key={index} content={file}></Download>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Project;
