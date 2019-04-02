import { combineReducers } from 'redux';
import * as types from '@/constants';

const initialQueryData = {
  orderId: '',
  page: 0,
  size: 10
};

export const orderInfo = (state = {}, action) => {
  switch (action.type) {
    case types.OD_GET_ORDERINFO:
      return action.data;
    default:
      return state;
  }
};

export const allotableCourier = (state = [], action) => {
  switch (action.type) {
    case types.OD_GET_ALLOTABLE_COURIER:
      return action.data;
    default:
      return state;
  }
};

export const dataTotal = (state = 0, action) => {
  switch (action.type) {
    case types.OD_GET_ALLOTABLE_COURIER_TOTAL:
      return action.dataTotal;
    default:
      return state;
  }
};

export const queryData = (state = initialQueryData, action) => {
  switch (action.type) {
    case types.OD_SET_QUERYDATA:
      return action.queryData;
    default:
      return state;
  }
};

const orderDetail = combineReducers({
  orderInfo,
  allotableCourier,
  dataTotal,
  queryData
});

export default orderDetail;
