import { getActiveAlert, getBizInfo } from '@/api/alert';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import ActCard from './ActCard';
import ActSearch from './ActSearch';
import RuleDetail from './RuleDetail';
import styles from './index.less';
const ActiveAlarm = () => {
  const [visible, setVisible] = useState(false);
  const [teamList, setTeamLIst] = useState<any[]>([]);
  const [bizId, setBizId] = useState<any>();

  const getTeamList = async () => {
    const res = await getBizInfo({
      page: 1,
      onePage: 100,
    });
    setTeamLIst(res.query ?? []);
  };

  const getactiveList = async () => {
    if (!bizId) return;
    const res = await getActiveAlert({
      page: 1,
      onePage: 100,
      biz: bizId,
      // startTime:
    });
    console.log('res===>', res);
  };

  useEffect(() => {
    getactiveList();
  }, [bizId]);

  useEffect(() => {
    getTeamList();
  }, []);

  return (
    <div className={styles['active-content']}>
      <div className={styles['rule-list']}>
        <Row
          className={styles['rules-item']}
          justify="space-between"
          align="middle"
        >
          <Col>
            <h3>聚合规则</h3>
          </Col>
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
              }}
            >
              {v.name}
            </Col>
          </Row>
        ))}
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
