import { createUser, updateUser } from '@/api/alert';
import { Form, Input, Modal, Select, message } from 'antd';
import { useEffect } from 'react';

interface Iprops {
  visible: boolean;
  setVisible: (f: boolean) => void;
  reset: () => void;
  fieldsInfo: {
    type: 'create' | 'update';
    formValue?: {
      id: string;
      displayName?: string;
      name: string;
      role?: string;
      phone?: string;
    };
  };
}
function UserModal(props: Iprops) {
  const { visible, setVisible, reset, fieldsInfo } = props;

  const [form] = Form.useForm();
  const createUserApi = async () => {
    const formValue = await form.validateFields();
    const res = await createUser(formValue);
    console.log('创建用户===>', res);
    if (res.code === 200) {
      setVisible(false);
      message.success('创建成功');
      reset();
    }
  };
  const update = async () => {
    const formValue = await form.validateFields();
    const res = await updateUser(formValue);
    if (res.code === 200) {
      setVisible(false);
      message.success('更新成功');
      reset();
    }
  };
  const handleOk = () => {
    if (fieldsInfo.type === 'create') {
      createUserApi();
      return;
    }
    update();
  };
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (fieldsInfo.type === 'update') {
      form.setFieldsValue(fieldsInfo.formValue);
    } else {
      form.resetFields();
    }
  }, [fieldsInfo]);
  return (
    <Modal
      title="创建用户"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 4 }} form={form}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="显示名"
          name="displayName"
          rules={[{ required: true, message: '请输入显示名' }]}
        >
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

        <Form.Item label="角色" name="role" initialValue="Guest">
          <Select
            style={{ width: 120 }}
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'User', label: 'User' },
              { value: 'Guest', label: 'Guest' },
            ]}
          />
        </Form.Item>
        <Form.Item label="手机" name="phone">
          <Input placeholder="请输入手机" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserModal;
