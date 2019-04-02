import * as types from '@/constants';
import request from '@/utils/request';

export const setOrderInfo = data => ({ type: types.OD_GET_ORDERINFO, data });

export const getOrderInfo = orderId => dispatch => {
  request(`/express_orders/${orderId}`).then(data => {
    dispatch(setOrderInfo(data));
  });
};

export const changeQueryData = queryData => ({ type: types.OD_SET_QUERYDATA, queryData });
export const setAllotableCourier = data => ({ type: types.OD_GET_ALLOTABLE_COURIER, data });
export const setAllotableCourierTotal = dataTotal => ({
  type: types.OD_GET_ALLOTABLE_COURIER_TOTAL,
  dataTotal
});

export const getAllotableCourier = queryData => dispatch => {
  request('/express_allot/allotable_courier', {
    params: queryData
  }).then(({ results, totalCount }) => {
    dispatch(setAllotableCourier(results));
    dispatch(setAllotableCourierTotal(totalCount));
  });
};
