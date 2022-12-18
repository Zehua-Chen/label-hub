const React = require('react');
const { AuthProvider } = require('./src/services/auth');
const { ApiProvider } = require('./src/services/api/utils');
const { default: ProtectedRoute } = require('./src/components/ProtectedRoute');
const { authRouteGuard } = require('./src/services/auth');

module.exports.wrapRootElement = ({ element }) => {
  return <React.StrictMode>{element}</React.StrictMode>;
};

module.exports.wrapPageElement = ({ element, props }) => {
  const { path } = props;

  if (/^\/app/.test(path)) {
    return (
      <AuthProvider>
        <ApiProvider>
          <ProtectedRoute condition={authRouteGuard()}>
            {element}
          </ProtectedRoute>
        </ApiProvider>
      </AuthProvider>
    );
  }

  return element;
};
