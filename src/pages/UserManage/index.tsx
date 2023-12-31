import { deleteUser, getUserList } from '@/api/alert';
import { Button, Col, Input, Modal, Row, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import UserModal from './UserModal';
const UserManage = () => {
  const [userVisible, setUserVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState<number>();
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '显示名',
      dataIndex: 'displayName',
    },
    {
      title: '手机',
      dataIndex: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '操作',
      key: '33',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setUserId(record.id);
              setUserVisible(true);
              console.log('record.id====', record.id);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                content: '确定删除吗?',
                onOk: () => deleteItem(record.id),
              });
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  const getUserListApi = async () => {
    const res = await getUserList({ searchKey, page: 1, onePage: 10 });
    console.log('res====>>', res);
    const { count, query } = res;
    setTotal(count);
    setTableData(query);
  };

  useEffect(() => {
    getUserListApi();
  }, []);
  const reset = () => {
    getUserListApi();
  };
  const deleteItem = async (id) => {
    const res = await deleteUser({ id });
    if (res.code === 200) {
      message.success('删除成功');
      reset();
    }
  };
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Input.Search
            placeholder="用户名,邮箱或手机号"
            onSearch={(v) => {
              setSearchKey(v);
              getUserListApi();
            }}
          ></Input.Search>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setUserId(0);
              setUserVisible(true);
            }}
          >
            创建用户
          </Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        pagination={{
          total,
        }}
      />
      <UserModal
        visible={userVisible}
        setVisible={setUserVisible}
        reset={reset}
        userId={userId}
      />
    </div>
  );
};

export default UserManage;
