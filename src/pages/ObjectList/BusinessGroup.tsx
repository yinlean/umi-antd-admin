import { FireOutlined } from '@ant-design/icons';
import { Card, Collapse, Input, Row } from 'antd';
import './index.less';

interface Iprops {
  width: number;
}
const Home = (props: Iprops) => {
  const { width } = props;
  const onSearch = (value: string) => console.log(value);
  return (
    <Card className="left-box " style={{ width }}>
      <Row justify="space-between" align="middle">
        业务组
        <FireOutlined />
      </Row>
      <Input.Search
        placeholder="组名称或ID"
        allowClear
        onSearch={onSearch}
        style={{ width: '100%', margin: '6px 0' }}
      />
      <Collapse accordion>
        <Collapse.Panel header="default" key="1">
          <p>分组一</p>
        </Collapse.Panel>
        <Collapse.Panel header="object 1" key="2">
          <p>分组二</p>
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
};

export default Home;
