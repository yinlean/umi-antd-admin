import { getBizInfo, getHistoryAlert } from '@/api/alert';
import { Button, Form, Input, Select, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: '规则标签及事件',
    dataIndex: '',
    render: (_, record) => (
      <div>
        {record?.lables?.map((v) => (
          <Tag color="purple" key={v}>
            {v}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: '等级',
    dataIndex: 'severity',
    render: (s) => {
      const severity = {
        1: '一级',
        2: '二级',
        3: '三级',
      };
      return severity[s];
    },
  },
  {
    title: '计算时间',
    dataIndex: 'startTime',
  },
];

const HistoryAlarm = () => {
  const [teamList, setTeamLIst] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<any[]>([]);

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
    const params = form?.getFieldsValue();
    const res = await getHistoryAlert({
      page: 1,
      onePage: 100,
      ...params,
    });
    setList(res?.query ?? []);
    setTotal(res?.count ?? 0);
  };
  useEffect(() => {
    getHistoryList();
  }, []);
  const search = () => {
    getHistoryList();
  };
  const reset = () => {
    form?.resetFields();
    getHistoryList();
  };
  return (
    <div>
      <Form
        layout="inline"
        initialValues={{
          startTime: Date.now() - 7 * 24 * 60 * 60 * 1000,
        }}
        form={form}
      >
        {/* <Form.Item label="" name="username">
          <AppstoreOutlined style={{ fontSize: 20 }} />
          <BarsOutlined style={{ fontSize: 20 }} />
        </Form.Item> */}
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
        <Form.Item label="name" name="name">
          <Input placeholder="" />
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
        <Form.Item label="">
          <Button onClick={search} style={{ marginRight: 16 }}>
            搜索
          </Button>
          <Button onClick={reset}>重置</Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          total,
        }}
      />
    </div>
  );
};

export default HistoryAlarm;
