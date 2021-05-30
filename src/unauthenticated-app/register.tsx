import { useAuth } from "context/auth-context";

const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLFormElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username"></input>
      </div>
      <div>
        <label htmlFor="username">密码</label>
        <input type="password" id="password"></input>
      </div>
      <button type="submit">注册</button>
    </form>
  );
};

export default RegisterScreen;
