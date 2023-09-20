import { getActiveAlert } from '@/api/alert';
import { useEffect, useState } from 'react';
import ActCard from './ActCard';
import ActSearch from './ActSearch';
import RuleDetail from './RuleDetail';
import styles from './index.less';
const ActiveAlarm = () => {
  const [visible, setVisible] = useState(false);
  const [cardData, setCardData] = useState<any[]>([]);
  const [category, setCategory] = useState<'biz' | 'name'>('name');
  const handleParams = (category) => {
    return category === 'name'
      ? { name: 'true' }
      : category === 'biz'
      ? { biz: 'true' }
      : {};
  };
  const getactiveList = async (params) => {
    setCategory(params.category ?? 'name');
    const res = await getActiveAlert({
      page: 1,
      onePage: 100,
      ...params,
      ...handleParams(params.category),
    });
    console.log('res===>', res);
    const data = res?.alertingRespon?.name ?? res?.alertingRespon?.biz ?? [];
    setCardData(data);
  };

  useEffect(() => {
    getactiveList({
      startTime: Date.now() - 24 * 60 * 60 * 1000,
      category: 'name',
    });
  }, []);

  return (
    <div className={styles['active-content']}>
      <div className={styles['warning-card']}>
        <ActSearch getactiveList={getactiveList} />
        <div className={styles['act-card']}>
          {/* {[1, 2, 3].map((v, index) => (
            <ActCard
              key={index}
              bgc="#F8E8E6"
              fontColor="#D53322"
              setVisible={setVisible}
            />
          ))} */}
          {cardData.map((v, index) => (
            <ActCard
              info={v}
              category={category}
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
