import * as types from '@/constants';

const orderDetail = (state = {}, action) => {
  switch (action.type) {
    case types.OD_SET_ORDERDETAIL:
      return action.data;
    default:
      return state;
  }
};

export default orderDetail;
