import { combineReducers } from 'redux';
import statusQuery from './orderList/statusQuery';
import keyQuery from './orderList/KeyQuery';

export default combineReducers({
  statusQuery,
  keyQuery
});
