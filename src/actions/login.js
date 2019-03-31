import qs from 'qs';
import { push } from 'react-router-redux';
import request from '@/utils/request';
import Storage from '@/utils/storage';
import * as types from '@/constants';

const setSubmitting = loading => ({ type: types.LOGIN_SUBMITTING, loading });

const handleLogin = submitData => dispatch => {
  dispatch(setSubmitting(true));

  request('/sessions/create', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(submitData)
  })
    .then(({ result }) => {
      Storage.session.set('Authorization', result);
      dispatch(push('/order/list'));
    })
    .finally(() => {
      dispatch(setSubmitting(false));
    });
};

export default handleLogin;
