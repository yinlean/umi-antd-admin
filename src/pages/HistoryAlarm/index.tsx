import { getBizInfo, getHistoryAlert } from '@/api/alert';
import { AppstoreOutlined } from '@ant-design/icons';
import { Badge, Form, Input, Select, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

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
  const [teamList, setTeamLIst] = useState<any[]>([]);

  const getTeamList = async () => {
    const res = await getBizInfo({
      page: 1,
      onePage: 100,
    });
    setTeamLIst(res.query ?? []);
  };
  useEffect(() => {
    getTeamList();
  }, []);

  // 获取历史告警列表
  const getHistoryList = async () => {
    // if (!bizID) return;
    const res = await getHistoryAlert({
      page: 1,
      onePage: 100,
      // bizID: bizId,
      // startTime:
    });
    console.log('res===>', res);
  };
  useEffect(() => {
    getHistoryList();
  }, []);
  return (
    <div>
      <Form
        layout="inline"
        initialValues={{}}
        // onFinish={onFinish}
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
        <Form.Item label="" name="name">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item name="remember">
          <Select placeholder="业务组" style={{ width: 140 }}>
            {teamList?.map((v) => (
              <Select.Option value={v.id} key={v.id}>
                {v.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="事件级别" name="severity">
          <Select placeholder="事件级别">
            <Select.Option value={1}>一级</Select.Option>
            <Select.Option value={3}>二级</Select.Option>
            <Select.Option value={3}>三级</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Select placeholder="事件级别">
            <Select.Option value={'true'}>告警</Select.Option>
            <Select.Option value={'false'}>恢复</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
      </Form>
      <Table columns={columns} dataSource={[{}]} />
    </div>
  );
};

export default HistoryAlarm;
