import { defineConfig } from '@umijs/max';
// import Logo from './src/assets/dog_run.jpg';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '首页',
      path: '/home',
      icon: 'HomeOutlined',
      component: './Home',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '对象列表',
      path: '/objectList',
      icon: 'UnorderedListOutlined',
      component: './ObjectList',
    },
    {
      name: '活跃告警',
      path: '/activeAlarm',
      icon: 'WarningOutlined',
      component: './ActiveAlarm',
    },
    {
      name: '历史告警',
      path: '/historyAlarm',
      icon: 'PieChartOutlined',
      component: './HistoryAlarm',
    },
    {
      name: '日志追踪',
      path: '/logTracking',
      icon: 'RadarChartOutlined',
      component: './LogTracking',
    },
    {
      name: '团队管理',
      path: '/teamManage',
      icon: 'TeamOutlined',
      component: './TeamManage',
    },
    {
      name: '用户管理',
      path: '/userManage',
      icon: 'UserOutlined',
      component: './UserManage',
    },
    {
      name: '告警规则',
      path: '/warnRules',
      icon: 'SlidersOutlined',
      component: './WarnRules',
    },
    {
      name: '即时查询',
      path: '/searchOnline',
      icon: 'BarChartOutlined',
      component: './SearchOnline',
    },
    {
      path: '/*',
      component: './NotFound',
      layout: false,
    },
  ],
  npmClient: 'yarn',
  proxy: {
    '/api': {
      // target: 'http://192.168.247.8:8080/',
      target: 'http://x3xbm9.natappfree.cc/',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
});
