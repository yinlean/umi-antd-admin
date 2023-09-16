import { getUserInfo, login } from '@/api/alert';
import { history } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import './index.less';

type FieldType = {
  username?: string;
  password?: string;
};

function Login() {
  const onFinish = async (values: any) => {
    const res = await login(values);
    const token = res?.token;
    if (!token) return message.error('未获取token, 登录失败');
    localStorage.setItem('token', token);
    const data = await getUserInfo();
    console.log('data====>', data);
    history.replace('/');
  };

  return (
    <div className="login">
      <Form
        name="basic"
        labelCol={{ span: 8, style: { color: '#fff' } }}
        wrapperCol={{ span: 16 }}
        style={{
          backgroundColor: '#1677FF',
          padding: 30,
          margin: 'auto',
          borderRadius: 8,
        }}
        initialValues={{
          username: 'admin',
          password: '123456789011',
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '用户名必填' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '密码必填!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
