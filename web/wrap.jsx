const React = require('react');
const { AuthProvider } = require('./src/services/auth');
const { ApiProvider } = require('./src/services/api/utils');

module.exports.wrapRootElement = ({ element }) => {
  return <React.StrictMode>{element}</React.StrictMode>;
};

module.exports.wrapPageElement = ({ element, props }) => {
  const { path } = props;

  if (/^\/app/.test(path)) {
    return (
      <AuthProvider>
        <ApiProvider>{element}</ApiProvider>
      </AuthProvider>
    );
  }

  return element;
};
