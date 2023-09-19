// import { getStuList } from '@/api/stuList';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  useEffect(() => {
    // getStuList();
  }, []);
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>

      <div
        className={styles['grid-box']}
        style={{
          width: 1700,
          height: 600,
          border: '1px solid #eee',
          display: 'grid',
          gridTemplateColumns: 'repeat(13, 100px)',
          gridTemplateRows: 'repeat(4, 100px)',
          margin: '100px auto',
          gridGap: 10,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <div
          style={{
            gridRow: '1/3',
            gridColumn: '12/14',
          }}
        >
          对象列表
        </div>
        <div
          style={{
            gridRow: '1/2',
            gridColumn: '10/12',
          }}
        >
          活跃告警
        </div>
        <div
          style={{
            gridRow: '2/3',
            gridColumn: '1/3',
          }}
        >
          历史告警
        </div>
        <div
          style={{
            gridRow: '2/4',
            gridColumn: '6/9',
          }}
        >
          日志追踪
        </div>
        <div
          style={{
            gridRow: '3/5',
            gridColumn: '1/3',
          }}
        >
          团队管理
        </div>
        <div
          style={{
            gridColumn: '12/14',
            gridRow: '4/5',
          }}
        >
          用户管理
        </div>
        <div
          style={{
            gridColumn: '2/4',
            gridRow: '1/2',
          }}
        >
          告警规则
        </div>
        <div
          style={{
            gridColumn: '10/12',
            gridRow: '3/4',
          }}
        >
          即时查询
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
