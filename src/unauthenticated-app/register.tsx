import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LoginButton } from "./index";

const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    register({ username, password });
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
      <LoginButton htmlType="submit" type="primary">
        注册
      </LoginButton>
    </Form>
  );
};

export default RegisterScreen;
