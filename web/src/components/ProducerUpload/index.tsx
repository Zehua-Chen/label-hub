import React, { useState, useEffect } from 'react';
import Layout from 'src/components/Layout';
import Navbar from 'src/components/Navbar';
import UploadButton from 'src/components/UploadButton';

function Upload(): JSX.Element {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (!image) {
      return;
    }

    const url = URL.createObjectURL(image);
    setImageURL(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  function onUploadChange(file: File) {
    setImage(file);
  }

  return (
    <Layout navigation={<Navbar title='Upload'></Navbar>}>
      <form className='container-fluid'>
        <div className='row'>
          <div className='col-8'>
            <img className='img-fluid' src={imageURL} />
          </div>
          <div className='col'>Tags</div>
        </div>
        <div className='row mt-2'>
          <div className='col-8 d-grid'>
            {!image ? (
              <UploadButton onChange={onUploadChange}>Upload</UploadButton>
            ) : null}
            {image ? <button className='btn btn-primary'>Save</button> : null}
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default Upload;
