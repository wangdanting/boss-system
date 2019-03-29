import qs from 'qs';
import request from '@/utils/request';
import Storage from '@/utils/storage';
import * as types from '@/constants/login';

const setSubmitting = loading => ({ type: types.SET_SUBMITTING, loading });

const handleLogin = submitData => dispatch => {
  dispatch(setSubmitting(true));

  request('/sessions/create', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(submitData)
  })
    .then(({ result }) => {
      Storage.session.set('Authorization', result);
      // const { history } = this.props;
      // history.push('/dishes/list');
    })
    .catch(() => {
      dispatch(setSubmitting(false));
    });
};

export default handleLogin;
