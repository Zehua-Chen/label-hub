import React from 'react';
import Layout from 'src/components/Layout';
import Navbar from 'src/components/Navbar';

function Upload(): JSX.Element {
  return (
    <Layout navigation={<Navbar title='Upload'></Navbar>}>
      <form></form>
    </Layout>
  );
}

export default Upload;
