import { getApp, getIdent } from '@/api/alert';
import { Button, Cascader } from 'antd';
import { useEffect, useState } from 'react';
import LogList from './LogList';
const TARGET = '127.0.0.1';

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const optionLists: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];
const LogTracking = () => {
  const [options, setOptions] = useState<Option[]>(optionLists);

  //   alert('您的浏览器支持 WebSocket!');
  const [ws, setWs] = useState<WebSocket>();
  let timer: NodeJS.Timeout;
  const token = localStorage.getItem('token');

  const getapps = async (ident, callback) => {
    const res = await getApp({
      ident,
    });
    console.log('getapps====>', res);
    callback && callback(res);
  };

  const getIdents = async () => {
    const res = await getIdent({});
    console.log('getIdent====>', res);
    setOptions(
      res?.idents?.map((v) => ({
        value: v,
        label: v,
        isLeaf: false,
      })),
    );
    // getapps(res?.idents?.[0]);
  };

  // 打开一个 web socket
  useEffect(() => {
    getIdents();

    const socket = new WebSocket(`ws://${TARGET}:10000?token=${token}`);
    socket.onopen = function () {
      // Web Socket 已连接上，使用 send() 方法发送数据
      console.log('链接成功...');
      // 发送心跳
      // timer = setInterval(() => {
      //   socket.send('ping');
      // }, 5000);
    };
    setWs(socket);
    return () => {
      socket.close();
    };
  }, []);
  // const ws = new WebSocket(`ws://server.natappfree.cc:44565?token=${token}`);

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
  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    getapps(targetOption.value, (res) => {
      // load options lazily
      targetOption.children = res?.app?.map((v) => ({
        label: v,
        value: v,
      }));
      setOptions([...options]);
    });
  };
  const onChange = (value: (string | number)[], selectedOptions: Option[]) => {
    // console.log(value, selectedOptions);
    ws?.send(
      JSON.stringify({
        target: value?.[0],
        app: value?.[1],
        position: '/tmp/templog/a-1.log',
      }),
    );
  };
  return (
    <div>
      <Button
        onClick={() => {
          if (ws) {
            ws.close();
          }
        }}
      >
        close
      </Button>
      <Cascader options={options} onChange={onChange} loadData={loadData} />
      <LogList ws={ws} />
    </div>
  );
};

export default LogTracking;
