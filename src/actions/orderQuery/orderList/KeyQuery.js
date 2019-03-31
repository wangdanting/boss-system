import * as types from '@/constants';
import request from '@/utils/request';

export const changeQueryData = queryData => ({ type: types.KQ_CHANGE_QUERYDATA, queryData });
export const changeData = data => ({ type: types.KQ_CHANGE_DATA, data });
export const changeDataTotal = dataTotal => ({ type: types.KQ_CHANGE_DATA_TOTAL, dataTotal });

export const handleSearch = queryData => dispatch => {
  request('/express_orders', {
    params: queryData
  }).then(({ results, totalCount }) => {
    dispatch(changeData(results));
    dispatch(changeDataTotal(totalCount));
  });
};
