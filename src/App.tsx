import { useAuth } from "context/auth-context";
import UnAuthenticatedApp from "unauthenticated-app";
import AuthenticatedApp from "authenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();

  return <div>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</div>;
}

export default App;
