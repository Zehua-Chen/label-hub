import * as React from 'react';
import { Link } from 'gatsby';
import HeadContent from 'src/components/HeadContent';
import Layout from 'src/components/Layout';

function App() {
  return (
    <Layout>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to='producer'>Producer</Link>
        </li>
        <li className='list-group-item'>
          <Link to='consumer'>Consumer</Link>
        </li>
      </ul>
    </Layout>
  );
}

export function Head() {
  return <HeadContent title='Label Hub' />;
}

export default App;
