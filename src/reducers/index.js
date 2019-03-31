import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import statusQuery from './orderQuery/orderList/statusQuery';

export default combineReducers({
  login,
  statusQuery,
  routerReducer
});
