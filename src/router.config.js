import Login from './pages/Login';
import BasicLayout from './layouts/BasicLayout';
import OrderQuery from './pages/Order/OrderQuery';
import OrderDetail from './pages/Order/OrderQuery/OrderDetail';
import OrderDispatch from './pages/Order/OrderDispatch';
import OrderDispatchDetail from './pages/Order/OrderDispatch/OrderDetail';
import ManageCourier from './pages/Courier/ManageCourier';
import AddOrEditCourier from './pages/Courier/ManageCourier/AddOrEditCourier';
import DeliverySettings from './pages/DeliverySettings';

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
        name: '状态筛选',
        icon: 'file-search',
        routes: [
          {
            path: '/order',
            redirect: '/order/list'
          },
          {
            path: '/order/list',
            name: '状态查询',
            exact: true,
            component: OrderQuery
          },
          {
            path: '/order/list/detail/:id',
            name: '详情展示',
            hideInMenu: true,
            component: OrderDetail
          },
          {
            path: '/order/dispatch',
            name: '全局参数',
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
        name: '表单状态',
        icon: 'file-search',
        routes: [
          {
            path: '/courier',
            redirect: '/courier/list'
          },
          {
            path: '/courier/list',
            name: '批量操作',
            exact: true,
            component: ManageCourier
          },
          {
            path: '/courier/list/add',
            name: '表单管理(新增)',
            hideInMenu: true,
            component: AddOrEditCourier
          },
          {
            path: '/courier/list/edit/:id',
            name: '表单管理(编辑)',
            hideInMenu: true,
            component: AddOrEditCourier
          }
        ]
      },
      {
        path: '/setting',
        name: '状态设置',
        icon: 'file-search',
        routes: [
          {
            path: '/setting',
            redirect: '/setting/form'
          },
          {
            path: '/setting/form',
            name: 'tabs设置',
            component: DeliverySettings
          }
        ]
      }
    ]
  }
];
