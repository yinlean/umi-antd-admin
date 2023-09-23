import { useState } from 'react';
import './index.less';
function LogList({ ws }: { ws: WebSocket }) {
  const [logList, setLogList] = useState<string[]>([]);
  if (!ws) return;
  ws.onmessage = function (evt) {
    console.log(evt.data);
    const received_msg = evt.data ? JSON.parse(evt?.data || '')?.content : '';
    if (received_msg) {
      setLogList([received_msg, ...logList]);
    }
  };

  return (
    <div className="codeBox">
      {logList.map((v, i) => (
        <p key={i}>
          {i + 1} - {v}
        </p>
      ))}
    </div>
  );
}

export default LogList;
