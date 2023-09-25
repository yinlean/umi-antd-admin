import { getHistoryAlert } from '@/api/alert';
import { Drawer, FormInstance, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
interface Iprops {
  visible: boolean;
  setVisible: (f: boolean) => void;
  detailInfo: {
    bizID?: number;
    name?: string;
    category: 'biz' | 'name';
  };
  form: FormInstance;
}

function RuleDetail(props: Iprops) {
  const { visible, setVisible, detailInfo, form } = props;
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  // 获取告警列表
  const getHistoryList = async () => {
    let params = {
      page: 1,
      onePage: 100,
      state: "true",
      startTime: form?.getFieldValue('startTime'),
    };
    if (detailInfo.category === 'biz') {
      params.bizID = detailInfo.bizID;
    } else {
      params.name = detailInfo.name;
    }
    const res = await getHistoryAlert(params);
    console.log('res===>', res);
    setList(res?.query || []);
    setTotal(res?.count ?? 0);
  };

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
      title: '计算时间',
      dataIndex: 'startTime',
    },
  ];

  useEffect(() => {
    getHistoryList();
  }, [detailInfo]);
  return (
    <Drawer
      title="详细信息"
      placement="right"
      width={600}
      closable={false}
      open={visible}
      onClose={() => setVisible(false)}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        pagination={{
          total,
        }}
      />
    </Drawer>
  );
}

export default RuleDetail;
