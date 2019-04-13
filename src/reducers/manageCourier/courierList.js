import { combineReducers } from 'redux';
import * as types from '@/constants';

const initialQueryData = {
  status: '', // 配送员状态
  mobile: '', // 配送员手机号
  page: 0,
  size: 10
};

export const queryData = (state = initialQueryData, action) => {
  switch (action.type) {
    case types.MC_CHANGE_QUERYDATA:
      return action.queryData;
    default:
      return state;
  }
};

export const data = (state = [], action) => {
  switch (action.type) {
    case types.MC_CHANGE_DATA:
      return action.data;
    default:
      return state;
  }
};

export const dataTotal = (state = 0, action) => {
  switch (action.type) {
    case types.MC_CHANGE_DATA_TOTAL:
      return action.dataTotal;
    default:
      return state;
  }
};

// 批量选择的配送员
export const selectedRowKeys = (state = [], action) => {
  switch (action.type) {
    case types.MC_CHANGE_SELECTEDROWKEYS:
      return action.selectedRowKeys;
    default:
      return state;
  }
};

const courierList = combineReducers({
  data,
  dataTotal,
  queryData,
  selectedRowKeys
});

export default courierList;
