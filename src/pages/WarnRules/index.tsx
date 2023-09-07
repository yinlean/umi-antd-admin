import { Loading3QuartersOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Switch, Table, Tag } from 'antd';
import { useState } from 'react';
import BusinessGroup from '../ObjectList/BusinessGroup';
import RuleForms from './RuleForms';
const WarnRules = () => {
  const [tableData, setTableData] = useState([{}]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: '级别',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: () => (
        <>
          <Tag color="geekblue">12313</Tag>
        </>
      ),
    },
    {
      title: '告警接收者',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '附加标签',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '更新时间',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '启用',
      dataIndex: 'name',
      key: 'name',
      render: () => <Switch defaultChecked onChange={(e) => console.log(e)} />,
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'name',
      render: () => (
        <>
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
        </>
      ),
    },
  ];
  const onSearch = (value: string) => console.log(value);
  return (
    <div className="home-content">
      <BusinessGroup width={200} />
      <Card className="flex-1">
        <Row justify="space-between" style={{ marginBottom: 10 }}>
          <Col>
            <Form layout="inline">
              <Form.Item>
                <Button shape="circle" icon={<LoadingOutlined />} />
                <Button shape="circle" icon={<Loading3QuartersOutlined />} />
              </Form.Item>
              <Form.Item label="">
                <Input.Search
                  placeholder="模糊搜索表格内容(多个关键词请用空格分隔)"
                  allowClear
                  onSearch={onSearch}
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ marginRight: 20 }}>
            <Button onClick={() => setOpen(true)}>创建告警规则</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={tableData} />
      </Card>
      <RuleForms open={open} setOpen={setOpen} />
    </div>
  );
};

export default WarnRules;
