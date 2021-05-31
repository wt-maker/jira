import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
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
        <Input type="text" id="username"></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password"></Input>
      </Form.Item>
      <Button htmlType="submit" type="primary">
        注册
      </Button>
    </Form>
  );
};

export default RegisterScreen;
