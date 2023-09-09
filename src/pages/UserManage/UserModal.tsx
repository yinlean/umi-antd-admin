import { Form, Input, Modal } from 'antd';

interface Iprops {
  visible: boolean;
  setVisible: (f: boolean) => void;
}
function UserModal(props: Iprops) {
  const { visible, setVisible } = props;

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      title="创建用户"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 4 }}>
        <Form.Item label="用户名">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="显示名">
          <Input placeholder="请输入显示名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="角色">
          <Input placeholder="请输入角色" />
        </Form.Item>
        <Form.Item label="邮箱">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item label="手机">
          <Input placeholder="请输入手机" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserModal;
