import Login from './pages/Login';
import BasicLayout from './layouts/BasicLayout';
import OrderList from './pages/Order/OrderList';
import OrderDispatch from './pages/Order/OrderDispatch';
import MapDispatch from './pages/Order/MapDispatch';

export default [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/',
        redirect: '/order/list'
      },
      {
        path: '/order',
        name: '订单管理',
        icon: 'file-search',
        routes: [
          {
            path: '/order',
            redirect: '/order/list'
          },
          {
            path: '/order/list',
            name: '订单查询',
            component: OrderList
          },
          {
            path: '/order/dispatch',
            name: '订单调度',
            component: OrderDispatch
          },
          {
            path: '/order/map-dispatch',
            name: '地图调度',
            component: MapDispatch
          }
        ]
      }
    ]
  }
];
