import { Button, Col, Input, Row, Table } from 'antd';
import { useState } from 'react';
import UserModal from './UserModal';
const UserManage = () => {
  const [userVisible, setUserVisible] = useState(false);
  const columns = [
    {
      title: '用户名',
      dataIndex: '',
      render: () => <div className="">张三</div>,
    },
    {
      title: '显示名',
      dataIndex: '',
      render: () => '张三丰',
    },
    {
      title: '邮箱',
      dataIndex: '',
      render: () => <div>2023-09-07 12:00:00</div>,
    },
    {
      title: '手机',
      dataIndex: '',
      render: () => <div>13388889999</div>,
    },
    {
      title: '角色',
      dataIndex: '',
      render: () => <div>admin</div>,
    },
    {
      title: '操作',
      key: '33',
      render: () => (
        <>
          <Button type="link">编辑</Button>
          <Button type="link">重置密码</Button>
          <Button type="link" danger>
            删除
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Input.Search
            placeholder="用户名,邮箱或手机号"
            onSearch={(v) => console.log(v)}
          ></Input.Search>
        </Col>
        <Col>
          <Button onClick={() => setUserVisible(true)}>创建用户</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={[{}]} />
      <UserModal visible={userVisible} setVisible={setUserVisible} />
    </div>
  );
};

export default UserManage;
