import { useAuth } from "context/auth-context";
import UnAuthenticatedApp from "unauthenticated-app";
import AuthenticatedApp from "authenticated-app";
import "antd/dist/antd.less";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
