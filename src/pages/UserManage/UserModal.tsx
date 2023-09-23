import { createUser, updateUser } from '@/api/alert';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, message } from 'antd';
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
  const disabled = fieldsInfo?.type === 'update';

  const createUserApi = async () => {
    const formValue = await form.validateFields();
    const res = await createUser(formValue);
    if (res.code === 200) {
      setVisible(false);
      message.success('创建成功');
      reset();
    }
  };
  const update = async () => {
    const formValue = await form.validateFields();
    const res = await updateUser({
      ...formValue,
      id: fieldsInfo?.formValue?.id,
    });
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
      width={900}
      title="创建用户"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 4 }}
        form={form}
        initialValues={{
          alertWay: [{}],
        }}
      >
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input disabled={disabled} placeholder="请输入用户名" />
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
        <Form.List name="alertWay">
          {(fields, { add, remove }) => (
            <div
            // style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
            >
              {fields.map((field) => {
                console.log('field====>', field);
                return (
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                    key={field.name}
                  >
                    <Form.Item
                      label=""
                      name={[field.name, 'alertWayType']}
                      initialValue="dingtalk"
                      style={{ marginLeft: 10 }}
                    >
                      <Select
                        options={[{ value: 'dingtalk', label: '钉钉' }]}
                      />
                    </Form.Item>
                    <Form.Item
                      label="alertToken"
                      name={[field.name, 'alertToken']}
                      style={{ marginLeft: 10 }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="alertGroupName"
                      name={[field.name, 'alertGroupName']}
                      style={{ marginLeft: 10 }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="" style={{ marginLeft: 10 }}>
                      <DeleteOutlined onClick={() => remove(field.name)} />
                    </Form.Item>
                  </div>
                );
              })}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}

export default UserModal;
