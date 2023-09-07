import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Row,
  Space,
  Table,
  Tag,
} from 'antd';
import { useState } from 'react';
import BusinessGroup from './BusinessGroup';
import styles from './index.less';

const ObjectList = () => {
  const [tableData, setTableData] = useState([{}]);
  const columns = [
    {
      title: '标识',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '标签',
      dataIndex: 'name',
      key: 'name',
      render: () => (
        <>
          <Tag color="geekblue">12313</Tag>
        </>
      ),
    },
    {
      title: '业务组',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
  ];
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '修改业务组',
    },
    {
      key: '1',
      label: '批量删除',
    },
  ];
  const onSearch = (value: string) => console.log(value);
  return (
    <div className={styles['home-content']}>
      <BusinessGroup width={200} />
      <Card className={styles['flex-1']}>
        <Row justify="space-between" style={{ marginBottom: 10 }}>
          <Col>
            <Form layout="inline">
              <Form.Item>
                <Button shape="circle" loading icon={<SearchOutlined />} />
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
          <Col>
            <Dropdown menu={{ items }} arrow>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  批量操作
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>
        <Table rowKey="key" columns={columns} dataSource={tableData} />
      </Card>
    </div>
  );
};

export default ObjectList;
