import { combineReducers } from 'redux';
import moment from 'moment';
import * as types from '@/constants';

const dateFormat = 'YYYY-MM-DD';
const beginDay = moment(new Date('2019-03-01'), dateFormat)
  .startOf('day')
  .valueOf();
const endDay = moment(new Date('2019-05-01'), dateFormat)
  .endOf('day')
  .valueOf();

const initialQueryData = {
  status: 'all', // 订单状态
  orderWay: 'all', // 订单类型
  keyWords: '', // 关键字
  expectFetchCurrentStart: beginDay, // 开始时间
  expectFetchCurrentEnd: endDay, // 结束时间
  page: 0,
  size: 10
};

export const data = (state = [], action) => {
  switch (action.type) {
    case types.SQ_CHANGE_DATA:
      return action.data;
    default:
      return state;
  }
};

export const dataTotal = (state = 0, action) => {
  switch (action.type) {
    case types.SQ_CHANGE_DATA_TOTAL:
      return action.dataTotal;
    default:
      return state;
  }
};

export const queryData = (state = initialQueryData, action) => {
  switch (action.type) {
    case types.SQ_CHANGE_QUERYDATA:
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
