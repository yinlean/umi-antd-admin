import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import { useState } from 'react';
import styles from './index.less';
const TeamManage = () => {
  const [visible, setVisible] = useState(false);
  const [addUserVisible, setAddUserVVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
      title: '操作',
      key: '33',
      render: () => (
        <>
          <Button type="link" danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const userOk = () => {
    setAddUserVVisible(false);
  };
  const userCancel = () => {
    setAddUserVVisible(false);
  };

  const CreatorInfo = () => {
    return (
      <>
        <Row>
          <Col>
            <h4>CDH</h4>
          </Col>
          <Col offset={1} onClick={() => setVisible(true)}>
            <EditOutlined />
          </Col>
          <Col offset={1}>
            <DeleteOutlined />
          </Col>
        </Row>
        <Row>
          <Col>备注: 负责人:xxxx</Col>
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
            <Button type="link" onClick={() => setVisible(true)}>
              新建团队
            </Button>
          </Col>
        </Row>

        <Row>
          <Input placeholder="搜索团队名称"></Input>
        </Row>
        <Row>
          <div>团队名称--1</div>
        </Row>

        <Row>
          <div>团队名称--2</div>
        </Row>
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
            <Button onClick={() => setAddUserVVisible(true)}>添加成员</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={[{}]} />
      </div>

      {/* 新增/编辑团队信息 */}
      <Modal
        title="团队信息"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 4 }}>
          <Form.Item label="团队名称">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="备注">
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={[{}]}
        />
      </Modal>
    </div>
  );
};

export default TeamManage;
