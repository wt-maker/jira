import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LoginButton } from "./index";
import { useAsync } from "utils/use-async";

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    username,
    password,
    certifyPassword,
  }: {
    username: string;
    password: string;
    certifyPassword: string;
  }) => {
    if (password !== certifyPassword) {
      onError(new Error("请确认两次输入密码一致。"));
      return;
    }
    try {
      await run(register({ username, password }));
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
      <Form.Item
        name="certifyPassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type="password" id="password" placeholder="确认密码"></Input>
      </Form.Item>
      <LoginButton loading={isLoading} htmlType="submit" type="primary">
        注册
      </LoginButton>
    </Form>
  );
};

export default RegisterScreen;
