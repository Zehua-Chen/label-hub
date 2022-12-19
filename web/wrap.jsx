const React = require('react');
const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
const { AuthProvider } = require('./src/services/auth');
const { ApiProvider } = require('./src/services/api/utils');
const { default: ProtectedRoute } = require('./src/components/ProtectedRoute');
const { authRouteGuard } = require('./src/services/auth');

const queryClient = new QueryClient();

module.exports.wrapRootElement = ({ element }) => {
  return <React.StrictMode>{element}</React.StrictMode>;
};

module.exports.wrapPageElement = ({ element, props }) => {
  const { path } = props;

  if (/^\/app/.test(path)) {
    return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ApiProvider>
            <ProtectedRoute condition={authRouteGuard()}>
              {element}
            </ProtectedRoute>
          </ApiProvider>
        </QueryClientProvider>
      </AuthProvider>
    );
  }

  return element;
};
