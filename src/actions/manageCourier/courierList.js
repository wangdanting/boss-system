import * as types from '@/constants';
import request from '@/utils/request';

export const changeQueryData = queryData => ({ type: types.MC_CHANGE_QUERYDATA, queryData });
export const changeData = data => ({ type: types.MC_CHANGE_DATA, data });
export const changeDataTotal = dataTotal => ({ type: types.MC_CHANGE_DATA_TOTAL, dataTotal });

export const handleSearch = queryData => dispatch => {
  request('/express_courier', {
    params: queryData
  }).then(({ results, totalCount }) => {
    dispatch(changeData(results));
    dispatch(changeDataTotal(totalCount));
  });
};

export const setCourierStatus = (id, status) => (dispatch, getState) => {
  request(`/express_courier/${status}`, {
    params: { courierId: id },
    method: 'put'
  }).then(() => {
    const { queryData } = getState().manageCourier.courierList;
    dispatch(handleSearch(queryData));
  });
};

export const changeSelectedRowKeys = selectedRowKeys => ({
  type: types.MC_CHANGE_SELECTEDROWKEYS,
  selectedRowKeys
});

export const batchStopCourier = () => (dispatch, getState) => {
  const { queryData } = getState().manageCourier.courierList;
  dispatch(handleSearch(queryData));
};
