import { getBizInfo, getRules, updateRules } from '@/api/alert';
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Table,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import RuleForms from './RuleForms';
import styles from './index.less';

const WarnRules = () => {
  const [tableData, setTableData] = useState([]);
  const [teamList, setTeamLIst] = useState<any[]>([]);
  const [bizID, setBizID] = useState<number>();

  const [open, setOpen] = useState(false);
  const onSearch = (value: string) => console.log(value);

  const getTeamList = async () => {
    const res = await getBizInfo({
      page: 1,
      onePage: 100,
    });
    setTeamLIst(res.query ?? []);
  };

  const getRulesList = async () => {
    if (!bizID) return;
    const res = await getRules({
      page: 1,
      onePage: 100,
      bizID,
    });
    setTableData(res?.query ?? []);
  };

  const updateRule = async (params) => {
    if (!bizID) return;
    const res = await updateRules({
      ...params,
      bizID,
    });
    if (res.code === 200) {
      getRulesList();
    } else {
      message.error('操作失败');
    }
  };
  useEffect(() => {
    getRulesList();
  }, [bizID]);
  useEffect(() => {
    getTeamList();
  }, []);
  const columns = [
    {
      title: '级别',
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
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      // render: () => (
      //   <>
      //     <Tag color="geekblue">12313</Tag>
      //   </>
      // ),
    },
    // {
    //   title: '告警接收者',
    //   dataIndex: 'name',
    //   key: 'name',
    //   // render: text => <a>{text}</a>,
    // },
    // {
    //   title: '附加标签',
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '启用',
      dataIndex: 'active',
      key: 'active',
      render: (active, record) => {
        return (
          <Switch
            checked={active}
            onChange={(e) => {
              updateRule({
                state: e,
                id: record.id,
              });
            }}
          />
        );
      },
    },
    // {
    //   title: '操作',
    //   dataIndex: 'name',
    //   key: 'name',
    //   render: () => (
    //     <>
    //       <Button type="link">编辑</Button>
    //       <Button type="link">删除</Button>
    //     </>
    //   ),
    // },
  ];

  return (
    <div className={styles['warn-rule']}>
      <div className={styles['rule-list']}>
        <Row
          className={styles['rules-item']}
          justify="space-between"
          align="middle"
        >
          <Col>
            <h3>团队选择</h3>
          </Col>
          {/* <Col>
            <Button
              type="link"
              onClick={() => {
                // setTeamType({
                //   type: 'create',
                // });
                // setVisible(true);
              }}
            >
              新建团队
            </Button>
          </Col> */}
        </Row>

        {/* <Row>
          <Input placeholder="搜索团队名称"></Input>
        </Row> */}
        {teamList.map((v, i) => (
          <Row
            key={v.id}
            style={{ marginTop: 10, cursor: 'pointer' }}
            justify="space-between"
            className={v.id === bizID ? styles['active'] : ''}
            onClick={() => {
              setBizID(v.id);
              // getTeamInfo(v.id)
              // getRulesList(v.id);
            }}
          >
            <Col>{i + 1}</Col>
            <Col>{v.name}</Col>
          </Row>
        ))}
      </div>
      <Card style={{ flex: 1 }}>
        <Row justify="space-between" style={{ marginBottom: 10 }}>
          <Col>
            <Form layout="inline">
              {/* <Form.Item>
                <Button shape="circle" icon={<LoadingOutlined />} />
                <Button shape="circle" icon={<Loading3QuartersOutlined />} />
              </Form.Item> */}
              <Form.Item label="" name="title">
                <Input.Search
                  placeholder="模糊搜索表格内容(多个关键词请用空格分隔)"
                  allowClear
                  onSearch={onSearch}
                  style={{ width: 300 }}
                />
              </Form.Item>
              <Form.Item label="事件级别" name="severity">
                <Select placeholder="事件级别">
                  <Select.Option value={1}>一级</Select.Option>
                  <Select.Option value={3}>二级</Select.Option>
                  <Select.Option value={3}>三级</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
          {/* <Col style={{ marginRight: 20 }}>
            <Button onClick={() => setOpen(true)}>创建告警规则</Button>
          </Col> */}
        </Row>
        <Table columns={columns} dataSource={tableData} />
      </Card>
      <RuleForms open={open} setOpen={setOpen} />
    </div>
  );
};

export default WarnRules;
