import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import orderQuery from './orderQuery';
import orderDispatch from './orderDispatch';
import manageCourier from './manageCourier';
import common from './common';

export default combineReducers({
  login,
  common,
  orderQuery,
  routerReducer,
  orderDispatch,
  manageCourier
});
