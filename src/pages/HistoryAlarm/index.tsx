import { getAlert } from '@/api/alert';
import { AppstoreOutlined } from '@ant-design/icons';
import { Badge, Form, Input, Select, Table, Tag } from 'antd';

const columns = [
  {
    title: '集群',
    dataIndex: '',
    render: () => (
      <div className="">
        <Badge color="#f00" /> default
      </div>
    ),
  },
  {
    title: '规则标签及事件',
    dataIndex: '',
    render: () => (
      <div>
        <Tag color="purple">cpu=cpu_total</Tag>
        <Tag color="purple">cpu=cpu_total</Tag>
        <Tag color="purple">cpu=cpu_total</Tag>
        <Tag color="purple">cpu=cpu_total</Tag>
        <Tag color="purple">cpu=cpu_total</Tag>
        <Tag color="purple">cpu=cpu_total</Tag>
      </div>
    ),
  },
  {
    title: '计算时间',
    dataIndex: '',
    render: () => <div>2023-09-07 12:00:00</div>,
  },
];

const HistoryAlarm = () => {
  // 获取历史告警列表
  const getHistoryList = async () => {
    // if (!bizID) return;
    const res = await getAlert({
      page: 1,
      onePage: 100,
      // bizID: bizId,
      // startTime:
    });
    console.log('res===>', res);
  };
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
      <Table columns={columns} dataSource={[{}]} />
    </div>
  );
};

export default HistoryAlarm;
