import * as types from '@/constants';
import request from '@/utils/request';

export const setOrderInfo = data => ({ type: types.OD_SET_ORDERDETAIL, data });

export const getOrderInfo = id => dispatch => {
  request(`/express_orders/${id}`).then(data => {
    dispatch(setOrderInfo(data));
  });
};
