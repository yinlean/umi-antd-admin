import { history } from '@umijs/max';
import { Button } from 'antd';
import './index.less';
function NotFound() {
  return (
    <div className="not-found">
      <Button
        type="link"
        onClick={() => {
          history.replace('/');
        }}
      >
        回到首页
      </Button>
    </div>
  );
}

export default NotFound;
