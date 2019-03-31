import { combineReducers } from 'redux';
import statusQuery from './orderList/statusQuery';
import keyQuery from './orderList/KeyQuery';
import orderDetail from './orderDetail';

export default combineReducers({
  statusQuery,
  keyQuery,
  orderDetail
});
