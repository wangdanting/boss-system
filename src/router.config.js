import Login from './pages/Login';
import BasicLayout from './layouts/BasicLayout';
import OrderQuery from './pages/Order/OrderQuery';
import OrderDetail from './pages/Order/OrderQuery/OrderDetail';
import OrderDispatch from './pages/Order/OrderDispatch';
import OrderDispatchDetail from './pages/Order/OrderDispatch/OrderDetail';
import ManageCourier from './pages/Courier/ManageCourier';
import AddOrEditCourier from './pages/Courier/ManageCourier/AddOrEditCourier';

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
            exact: true,
            component: OrderQuery
          },
          {
            path: '/order/list/detail/:id',
            name: '订单详情',
            hideInMenu: true,
            component: OrderDetail
          },
          {
            path: '/order/dispatch',
            name: '订单调度',
            exact: true,
            component: OrderDispatch
          },
          {
            path: '/order/dispatch/detail/:id',
            name: '订单详情',
            hideInMenu: true,
            component: OrderDispatchDetail
          }
        ]
      },
      {
        path: '/courier',
        name: '配送员管理',
        icon: 'file-search',
        routes: [
          {
            path: '/courier',
            redirect: '/courier/list'
          },
          {
            path: '/courier/list',
            name: '配送员列表',
            exact: true,
            component: ManageCourier
          },
          {
            path: '/courier/list/add',
            name: '新增配送员',
            hideInMenu: true,
            component: AddOrEditCourier
          },
          {
            path: '/courier/list/edit/:id',
            name: '新增配送员',
            hideInMenu: true,
            component: AddOrEditCourier
          }
        ]
      }
    ]
  }
];
