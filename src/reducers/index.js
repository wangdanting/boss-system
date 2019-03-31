import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import orderQuery from './orderQuery';

export default combineReducers({
  login,
  orderQuery,
  routerReducer
});
