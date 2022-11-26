import React, { useState, useEffect, MouseEvent } from 'react';
import { navigate } from 'gatsby';
import Layout from 'src/components/Layout';
import Navbar from 'src/components/Navbar';
import UploadButton from 'src/components/UploadButton';

function Upload(): JSX.Element {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [tags, setTags] = useState([] as string[]);

  useEffect(() => {
    if (!image) {
      return;
    }

    const url = URL.createObjectURL(image);
    setImageURL(url);

    // TODO: use tags from backend for production
    setTags(['tag1', 'tag2']);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  function onUploadChange(file: File) {
    setImage(file);
  }

  function onSaveClick(event: MouseEvent) {
    event.preventDefault();
    navigate('/app/producer/');
  }

  return (
    <Layout navigation={<Navbar title='Upload'></Navbar>}>
      <form className='container-fluid'>
        <div className='row'>
          <div className='col-8'>
            <img className='img-fluid' src={imageURL} />
          </div>
          <div className='col'>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-8 d-grid'>
            {!image ? (
              <UploadButton onChange={onUploadChange}>Upload</UploadButton>
            ) : null}
            {image ? (
              <button className='btn btn-primary' onClick={onSaveClick}>
                Save
              </button>
            ) : null}
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default Upload;
