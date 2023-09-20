import { getBizInfo } from '@/api/alert';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
interface Iprops {
  bgc: string;
  fontColor: string;
  setVisible?: (f: boolean) => void;
  category: 'biz' | 'name';
  info: any;
}

function ActCard(props: Iprops) {
  const { bgc, fontColor, category, info, setVisible } = props;
  const [teamList, setTeamLIst] = useState<any[]>([]);

  const getTeamList = async () => {
    const res = await getBizInfo({
      page: 1,
      onePage: 100,
    });
    setTeamLIst(res.query ?? []);
  };
  useEffect(() => {
    getTeamList();
  }, []);
  return (
    <Card
      bordered={false}
      // onClick={() => setVisible(true)}
      style={{
        width: 240,
        height: 140,
        backgroundColor: bgc,
        borderLeft: `10px solid ${fontColor}`,
        margin: 10,
      }}
    >
      <p style={{ color: fontColor }}>
        {category === 'name'
          ? info.name
          : teamList?.filter((v) => info.biz_id === v.id)?.[0]?.name ?? '-'}
      </p>
      <p className={styles['act-num']} style={{ color: fontColor }}>
        {info.count}
      </p>
    </Card>
  );
}

export default ActCard;
