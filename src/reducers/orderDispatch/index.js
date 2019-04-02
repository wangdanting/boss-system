import { combineReducers } from 'redux';
import orderList from './orderList';
import orderDetail from './orderDetail';

export default combineReducers({
  orderList,
  orderDetail
});
