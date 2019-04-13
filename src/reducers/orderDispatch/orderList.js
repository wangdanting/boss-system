import { combineReducers } from 'redux';
import * as types from '@/constants';

const initialQueryData = {
  status: 'allocated', // 订单状态
  expressOrderId: '', // 订单号
  orderWay: 'all',
  page: 0,
  size: 10
};

export const data = (state = [], action) => {
  switch (action.type) {
    case types.OD_CHANGE_DATA:
      return action.data;
    default:
      return state;
  }
};

export const dataTotal = (state = 0, action) => {
  switch (action.type) {
    case types.OD_CHANGE_DATA_TOTAL:
      return action.dataTotal;
    default:
      return state;
  }
};

export const queryData = (state = initialQueryData, action) => {
  switch (action.type) {
    case types.OD_CHANGE_QUERYDATA:
      return action.queryData;
    default:
      return state;
  }
};

const orderList = combineReducers({
  data,
  dataTotal,
  queryData
});

export default orderList;
