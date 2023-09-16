import { Button } from 'antd';
import { useEffect, useState } from 'react';
import LogList from './LogList';
const LogTracking = () => {
  //   alert('您的浏览器支持 WebSocket!');
  const [ws, setWs] = useState<WebSocket>();
  let timer: Timeout;
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NjkzMjYsImp0aSI6IjgiLCJpYXQiOjE2OTQzOTY1MjYuMjA2NDIzLCJpc3MiOiJmcmFuayJ9.mgKg6ANydpRvJDIby8dQkt_p4it_QG-TuzCPQ5OelpE';
  // 打开一个 web socket
  //   const ws = new WebSocket(`ws://192.168.1.135:10000?token=${token}`);
  useEffect(() => {
    const socket = new WebSocket(
      `ws://server.natappfree.cc:44565?token=${token}`,
    );
    socket.onopen = function () {
      // Web Socket 已连接上，使用 send() 方法发送数据
      console.log('链接成功...');
      // 发送心跳
      timer = setInterval(() => {
        socket.send('ping');
      }, 5000);
    };
    setWs(socket);
  }, []);
  // const ws = new WebSocket(`ws://server.natappfree.cc:44565?token=${token}`);

  const sendWs = () => {
    ws?.send(
      JSON.stringify({
        target: '127.0.0.1:16060',
        app: 'test-app',
        position: '/tmp/templog/a-1.log',
      }),
    );
  };

  if (ws) {
    ws.onclose = (e) => {
      console.log('ws 关闭', e);
      clearInterval(timer);
    };
    ws.onmessage = (evt) => {
      // 保持链接, 发送心跳
      if (evt.data === 'pong') {
        clearInterval(timer);
        timer = setInterval(() => {
          ws.send('ping');
        }, 5000);
      }
    };
    // 监听连接错误事件
    ws.onerror = (error) => {
      console.error('WebSocket连接错误：', error);
    };
  }

  return (
    <div>
      LogTracking
      <Button onClick={sendWs}>send</Button>
      <Button
        onClick={() => {
          if (ws) {
            ws.close();
          }
        }}
      >
        close
      </Button>
      <LogList ws={ws} />
    </div>
  );
};

export default LogTracking;
