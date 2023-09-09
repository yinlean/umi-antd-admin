import { Drawer, Table, Tag } from 'antd';

interface Iprops {
  visible: boolean;
  setVisible: (f: boolean) => void;
}

function RuleDetail(props: Iprops) {
  const { visible, setVisible } = props;
  const columns = [
    {
      title: '集群',
      dataIndex: '',
      render: () => <div>default</div>,
    },
    {
      title: '规则标签及事件',
      dataIndex: '',
      render: () => (
        <div>
          <Tag color="red">_name__</Tag>
          <Tag color="purple">cpu=cpu_total</Tag>
          <Tag color="magenta">magenta</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
        </div>
      ),
    },
    {
      title: '计算时间',
      dataIndex: '',
      render: () => <div>2023-09-07 12:00:00</div>,
    },
  ];
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      width={600}
      closable={false}
      open={visible}
      onClose={() => setVisible(false)}
    >
      <Table columns={columns} dataSource={[{}]} />
    </Drawer>
  );
}

export default RuleDetail;
