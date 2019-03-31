import types from '@/constants/orderQuery/orderList/statusQuery';
import request from '@/utils/request';

export const changeQueryData = queryData => ({ type: types.CHANGE_QUERYDATA, queryData });
export const changeData = data => ({ type: types.CHANGE_DATA, data });
export const changeDataTotal = dataTotal => ({ type: types.CHANGE_DATA_TOTAL, dataTotal });

export const handleSearch = queryData => dispatch => {
  request('/express_orders', {
    params: queryData
  }).then(({ results, totalCount }) => {
    dispatch(changeData(results));
    dispatch(changeDataTotal(totalCount));
  });
};
