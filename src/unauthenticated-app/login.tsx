import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LoginButton } from "./index";
import { useAsync } from "utils/use-async";

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login({ username, password }));
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="用户名"></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" placeholder="密码"></Input>
      </Form.Item>
      <LoginButton loading={isLoading} htmlType="submit" type="primary">
        登录
      </LoginButton>
    </Form>
  );
};

export default LoginScreen;
