import { useState } from 'react';

function LogList({ ws }: { ws: WebSocket }) {
  const [logList, setLogList] = useState<string[]>([]);

  ws.onmessage = function (evt) {
    console.log(evt.data);
    const received_msg = JSON.parse(evt.data || '')?.content ?? '';
    if (received_msg) {
      setLogList([received_msg, ...logList]);
    }
  };

  return (
    <div>
      {logList.map((v, i) => (
        <p key={i}>
          {i + 1} - {v}
        </p>
      ))}
    </div>
  );
}

export default LogList;
