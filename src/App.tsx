import { useAuth } from "context/auth-context";
import UnAuthenticatedApp from "unauthenticated-app";
import AuthenticatedApp from "authenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorCallBack } from "components/full-page";
import "antd/dist/antd.less";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      <ErrorBoundary fallBackRender={FullPageErrorCallBack}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
