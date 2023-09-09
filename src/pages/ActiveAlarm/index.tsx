import { Col, Row } from 'antd';
import { useState } from 'react';
import ActCard from './ActCard';
import ActSearch from './ActSearch';
import RuleDetail from './RuleDetail';
import styles from './index.less';
const ActiveAlarm = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles['active-content']}>
      <div className={styles['rule-list']}>
        <h3>聚合规则</h3>
        <Row
          className={styles['rules-item']}
          justify="space-between"
          align="middle"
        >
          <Col>rules-1</Col>
          <Col>公开</Col>
        </Row>
        <Row
          className={styles['rules-item']}
          justify="space-between"
          align="middle"
        >
          <Col>rules-2</Col>
          <Col>公开</Col>
        </Row>
      </div>
      <div className={styles['warning-card']}>
        <ActSearch />
        <div className={styles['act-card']}>
          {[1, 2, 3].map((v, index) => (
            <ActCard
              key={index}
              bgc="#F8E8E6"
              fontColor="#D53322"
              setVisible={setVisible}
            />
          ))}
          {[1, 2, 3].map((v, index) => (
            <ActCard
              key={index}
              bgc="#FBF2E7"
              fontColor="#E38434"
              setVisible={setVisible}
            />
          ))}
        </div>
      </div>
      <RuleDetail visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default ActiveAlarm;
