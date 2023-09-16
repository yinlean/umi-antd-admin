import {
  addTeamUser,
  createBiz,
  deleteBiz,
  deleteTeamUser,
  getBizInfo,
  getBizTeamInfo,
  getBizUserInfo,
  getUserList,
  updateBiz,
} from '@/api/alert';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
const TeamManage = () => {
  const [visible, setVisible] = useState(false);
  const [addUserVisible, setAddUserVVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [teamList, setTeamLIst] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [usertableLIst, setUsertableLIst] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [userTotal, setUserTotal] = useState(0);

  const [bizId, setBizId] = useState<any>();
  const [teamType, setTeamType] = useState<{
    type: 'create' | 'edit';
    value?: {
      id: string;
      name: string;
      description: string;
    };
  }>({
    type: 'create',
  });
  const [teamInfo, setTeamInfo] = useState();
  const [form] = Form.useForm();

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
      title: '操作',
      key: '33',
      render: (_, record) => (
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
      ),
    },
  ];
  const deleteItem = async (id) => {
    const res = await deleteTeamUser({ userID: id, bizID: teamInfo?.id });
    console.log('res====>>', res);
    if (res.code === 200) {
      message.success('删除成功');
      getTeamList();
    }
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOk = async () => {
    const params = await form.validateFields();

    if (teamType.type === 'create') {
      const res = await createBiz(params);
      if (res.code === 200) {
        setVisible(false);
        message.success('创建成功');
        getTeamList();
      }
      getTeamList();
    } else {
      const res = await updateBiz({ ...params, id: teamInfo.id });
      if (res.code === 200) {
        setVisible(false);
        message.success('更新成功');
        getTeamList();
      }
      getTeamInfo();
    }
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  // 添加成员
  const userOk = async () => {
    const res = await addTeamUser({
      bizID: teamInfo?.id,
      userID: selectedRowKeys,
    });
    console.log('添加成员===>', res);
    if (res.code === 200) {
      message.success('添加成功');
      setAddUserVVisible(false);
      getTeamList();
    }
  };
  const userCancel = () => {
    setAddUserVVisible(false);
  };

  const getUserListApi = async () => {
    const res = await getUserList({ page: 1, onePage: 100 });
    const { count, query } = res;
    setUserTotal(count);
    setUsertableLIst(query);
  };

  const getTeamInfo = async () => {
    if (!bizId) return;
    const res = await getBizUserInfo({
      bizID: bizId,
      onePage: 100,
      page: 1,
    });
    setTableData(res.query ?? []);
  };

  const getTeamList = async () => {
    const res = await getBizInfo({
      page: 1,
      onePage: 100,
    });
    setTeamLIst(res.query ?? []);
    setTotal(res.count);
  };

  const getBizTeamInfo_ = async () => {
    if (!bizId) return;
    const res = await getBizTeamInfo({
      id: bizId,
    });
    console.log('res===>', res);
    setTeamInfo(res);
  };
  useEffect(() => {
    getUserListApi();
    getTeamList();
  }, []);
  useEffect(() => {
    getTeamInfo();
    getBizTeamInfo_();
  }, [bizId]);

  const CreatorInfo = () => {
    return (
      <>
        <Row>
          <Col>
            <h4>{teamInfo?.name ?? '-'}</h4>
          </Col>
          <Col
            offset={1}
            onClick={() => {
              if (!teamInfo?.id) return message.error('先选择一个业务');
              setTeamType({
                type: 'edit',
                value: teamInfo,
              });
              form.setFieldsValue(teamInfo);
              setVisible(true);
            }}
          >
            <EditOutlined />
          </Col>
          <Col offset={1}>
            <DeleteOutlined
              onClick={() => {
                Modal.confirm({
                  content: '确定删除吗?',
                  onOk: async () => {
                    const res = await deleteBiz({ id: teamInfo?.id });
                    if (res.code === 200) {
                      setVisible(false);
                      message.success('删除成功');
                      setTeamInfo({});
                      setTableData([]);
                      getTeamList();
                    }
                  },
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>备注: {teamInfo?.description ?? '-'}</Col>
        </Row>
      </>
    );
  };

  return (
    <div className={styles['team-manage']}>
      <div className={styles['rule-list']}>
        <Row
          className={styles['rules-item']}
          justify="space-between"
          align="middle"
        >
          <Col>
            <h3>聚合规则</h3>
          </Col>
          <Col>
            <Button
              type="link"
              onClick={() => {
                setTeamType({
                  type: 'create',
                });
                setVisible(true);
              }}
            >
              新建团队
            </Button>
          </Col>
        </Row>

        <Row>
          <Input placeholder="搜索团队名称"></Input>
        </Row>
        {teamList.map((v, i) => (
          <Row
            key={v.id}
            style={{ marginTop: 10, cursor: 'pointer' }}
            justify="space-between"
          >
            <Col>{i + 1}</Col>
            <Col
              onClick={() => {
                setBizId(v.id);
                // getTeamInfo(v.id)
              }}
            >
              {v.name}
            </Col>
          </Row>
        ))}
      </div>
      <div className={styles['team-list']}>
        <Alert
          message={<CreatorInfo />}
          type="success"
          style={{ marginBottom: 10 }}
        />
        <Row justify="space-between" align="middle">
          <Col>
            <Input.Search
              placeholder="用户名,邮箱或手机号"
              onSearch={(v) => console.log(v)}
            ></Input.Search>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (!teamInfo?.id) return message.error('先选择一个业务');
                setSelectedRowKeys([]);
                setAddUserVVisible(true);
              }}
            >
              添加成员
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={tableData} />
      </div>

      {/* 新增/编辑团队信息 */}
      <Modal
        title="团队信息"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 4 }} form={form}>
          <Form.Item label="团队名称" name="name">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="备注" name="description">
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
      {/* 添加团队成员 */}
      <Modal
        title="添加团队成员"
        width={600}
        open={addUserVisible}
        onOk={userOk}
        onCancel={userCancel}
      >
        <Row style={{ margin: '20px 0' }}>
          <Col span={6}>团队名称: xxx</Col>
          <Col span={18}>
            <Input.Search
              placeholder="用户名,邮箱或手机号"
              onSearch={(v) => console.log(v)}
            ></Input.Search>
          </Col>
        </Row>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={usertableLIst}
        />
      </Modal>
    </div>
  );
};

export default TeamManage;
