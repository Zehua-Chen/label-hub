import * as React from 'react';
import { Link } from 'gatsby';
import DashboardLayout from 'src/components/DashboardLayout';
import Checkbox from 'src/components/Checkbox';

interface Photo {
  name: string;
  date: string;
  income: string;
  tags: string[];
}

function useMockPhotos(): Photo[] {
  const photos: Photo[] = [];

  for (let i = 0; i < 30; i++) {
    photos.push({
      name: `upload-${i}.png`,
      date: new Date().toDateString(),
      income: `${i}`,
      tags: ['test'],
    });
  }

  return photos;
}

interface Tag {
  displayName: string;
}

function useTags(): Tag[] {
  return [
    {
      displayName: 'Cat',
    },
    {
      displayName: 'Dog',
    },
  ];
}

function ProducerDashboard() {
  const photos = useMockPhotos();
  const tags = useTags();

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
            <h2>$32.68</h2>
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
                {photos.map((photo, index) => (
                  <tr key={index}>
                    <th scope='row'>{photo.name}</th>
                    <td>{photo.date}</td>
                    <td>{photo.income}</td>
                    <td>{photo.tags.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProducerDashboard;
