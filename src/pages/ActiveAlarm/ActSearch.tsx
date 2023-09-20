import { AppstoreOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';

function ActSearch({ getactiveList }) {
  const [form] = Form.useForm();
  const reset = () => {
    form.resetFields();
    getactiveList({
      startTime: Date.now() - 24 * 60 * 60 * 1000,
      category: 'name',
    });
  };
  const search = () => {
    getactiveList(form.getFieldsValue());
  };
  return (
    <div>
      <Form
        form={form}
        layout="inline"
        initialValues={{
          startTime: Date.now() - 24 * 60 * 60 * 1000,
          category: 'name',
        }}
      >
        <Form.Item label="" name="username">
          <AppstoreOutlined style={{ fontSize: 20 }} />
          {/* <BarsOutlined style={{ fontSize: 20 }} /> */}
        </Form.Item>
        <Form.Item label="时间" name="startTime">
          <Select style={{ width: 200 }} placeholder="时间">
            <Select.Option value={Date.now() - 6 * 60 * 60 * 1000}>
              最近6小时
            </Select.Option>
            <Select.Option value={Date.now() - 24 * 60 * 60 * 1000}>
              最近24小时
            </Select.Option>
            <Select.Option value={Date.now() - 3 * 24 * 60 * 60 * 1000}>
              最近3天
            </Select.Option>
            <Select.Option value={Date.now() - 7 * 24 * 60 * 60 * 1000}>
              最近7天
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="聚合规则" name="category">
          <Select style={{ width: 100 }} placeholder="">
            <Select.Option value="name">按名称</Select.Option>
            <Select.Option value="biz">按业务组</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="">
          <Button onClick={search}>搜索</Button>
          <Button onClick={reset}>重置</Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
      </Form>
    </div>
  );
}

export default ActSearch;
