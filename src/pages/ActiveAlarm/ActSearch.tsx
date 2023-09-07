import { AppstoreOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';

function ActSearch() {
  return (
    <div>
      <Form
        layout="inline"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
      >
        <Form.Item label="" name="username">
          <AppstoreOutlined style={{ fontSize: 20 }} />
          {/* <BarsOutlined style={{ fontSize: 20 }} /> */}
        </Form.Item>
        <Form.Item label="" name="username">
          <Select style={{ width: 100 }} placeholder="时间">
            <Select.Option value="demo">最近6小时</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="" name="c">
          <Input placeholder="集群" />
        </Form.Item>

        <Form.Item name="remember">
          <Select placeholder="业务组" style={{ width: 140 }}>
            <Select.Option>最近6小时</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="" name="a">
          <Select placeholder="事件级别">
            <Select.Option>最近6小时</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
      </Form>
    </div>
  );
}

export default ActSearch;
