import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'gatsby';
import * as uuid from 'uuid';
import HeadContent from 'src/components/HeadContent';
import Layout from 'src/components/Layout';
import { useApi } from 'src/services/api/utils';
import { DefaultApi } from 'src/services/api';
import { useAuth, Auth } from 'src/services/auth';

async function ensureUserInfoExists(api: DefaultApi, auth: Auth) {
  try {
    await api.userinfoGet({ accessToken: auth.accessToken });
  } catch (e) {
    await api.userinfoPut({
      accessToken: auth.accessToken,
      putUserInfoRequest: {
        projectID: uuid.v1(),
        first: '',
        last: '',
        title: '',
        email: '',
        aboutme: '',
      },
    });
  }
}

function App() {
  const api = useApi();
  const auth = useAuth();

  useEffect(() => {
    ensureUserInfoExists(api, auth);
  }, [api, auth]);

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
