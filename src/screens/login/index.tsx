const baseUrl = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };
  const login = (userinfo: { username: string; password: string }) => {
    fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    }).then(async (response) => {
      if (response.ok) {
        console.log(response);
      }
    });
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
      <button type="submit">登录</button>
    </form>
  );
};

export default LoginScreen;
