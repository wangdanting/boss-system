import { combineReducers } from 'redux';
// import moment from 'moment';
import types from '@/constants/orderQuery/orderList/statusQuery';

// const beginDay = moment().startOf('day');

const initialQueryData = {
  status: 'all', // 订单状态
  orderWay: 'all', // 订单类型
  keyWords: '', // 关键字
  expectFetchCurrentStart: 1553788800000, // 开始时间
  expectFetchCurrentEnd: 1553875199000, // 结束时间
  page: 0,
  size: 10
};

export const data = (state = [], action) => {
  switch (action.type) {
    case types.CHANGE_DATA:
      return action.data;
    default:
      return state;
  }
};

export const dataTotal = (state = 0, action) => {
  switch (action.type) {
    case types.CHANGE_DATA_TOTAL:
      return action.dataTotal;
    default:
      return state;
  }
};

export const queryData = (state = initialQueryData, action) => {
  switch (action.type) {
    case types.CHANGE_QUERYDATA:
      return action.queryData;
    default:
      return state;
  }
};

const statusQuery = combineReducers({
  data,
  dataTotal,
  queryData
});

export default statusQuery;
