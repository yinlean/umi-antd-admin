import { Card } from 'antd';
import styles from './index.less';
interface Iprops {
  bgc: string;
  fontColor: string;
}

function ActCard(props: Iprops) {
  const { bgc, fontColor } = props;
  return (
    <Card
      bordered={false}
      style={{
        width: 240,
        height: 140,
        backgroundColor: bgc,
        borderLeft: `10px solid ${fontColor}`,
        margin: 10,
      }}
    >
      <p style={{ color: fontColor }}>服务器的硬盘分区使用率超过95%, 请注意</p>
      <p className={styles['act-num']} style={{ color: fontColor }}>
        20
      </p>
    </Card>
  );
}

export default ActCard;